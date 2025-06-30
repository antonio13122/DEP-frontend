<template>
  <div class="scanner">
    <h2>Scan boat with webcam</h2>

    <div style="position: relative; width: 640px; height: 480px">
      <video
        ref="video"
        autoplay
        playsinline
        width="640"
        height="480"
        style="position: absolute; top: 0; left: 0"
      ></video>
      <canvas
        ref="canvas"
        width="640"
        height="480"
        style="position: absolute; top: 0; left: 0"
      ></canvas>
    </div>

    <div style="margin-top: 10px">
      <button @click="startWebcam" :disabled="stream">Start Webcam</button>
      <button @click="stopWebcam" :disabled="!stream">Stop Webcam</button>
    </div>

    <div v-if="message" class="message">
      {{ message }}
      <router-link v-if="linkText" :to="linkTarget" class="message-link">
        {{ linkText }}
      </router-link>
    </div>

    <pre class="detection-output">{{ formattedDetections }}</pre>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      stream: null,
      intervalId: null,
      width: 640,
      height: 480,
      lastDetections: [],
      message: "",
      linkText: "",
      linkTarget: "",
    };
  },
  methods: {
    async startWebcam() {
      if (this.stream) return;

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        this.stream = stream;
        this.$refs.video.srcObject = stream;
        this.startDetectionLoop();
      } catch (err) {
        console.error("Could not access webcam:", err);
      }
    },
    stopWebcam() {
      if (this.stream) {
        this.stream.getTracks().forEach((track) => track.stop());
        this.stream = null;
      }
      clearInterval(this.intervalId);
      this.clearCanvas();
      this.message = "";
      this.linkText = "";
      this.linkTarget = "";
    },
    startDetectionLoop() {
      this.intervalId = setInterval(this.captureAndDetect, 1500);
    },
    clearCanvas() {
      const canvas = this.$refs.canvas;
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, this.width, this.height);
    },
    async captureAndDetect() {
      const video = this.$refs.video;
      if (!video) return;

      const canvas = document.createElement("canvas");
      canvas.width = this.width;
      canvas.height = this.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, this.width, this.height);

      const base64Image = canvas.toDataURL("image/jpeg");

      try {
        const res = await fetch("http://localhost:8080/detect_frame", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: base64Image }),
        });

        const data = await res.json();
        const detections = Array.isArray(data.detections)
          ? data.detections
          : [];

        this.lastDetections = detections;
        this.drawDetections(detections);

        const name =
          data.most_likely_boat_name ||
          this.extractNameFromDetections(detections);

        if (!name) {
          this.message = " No boat name detected.";
          this.linkText = "";
          this.linkTarget = "";
          return;
        }

        await this.checkBoatInBackend(name);
      } catch (error) {
        console.error("Detection request failed:", error);
      }
    },
    drawDetections(detections) {
      const canvas = this.$refs.canvas;
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, this.width, this.height);

      detections.forEach((det) => {
        if (!det.bbox || det.bbox.length !== 4) return;

        const [x1, y1, x2, y2] = det.bbox;

        ctx.strokeStyle = "red";
        ctx.lineWidth = 2;
        ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);

        ctx.font = "16px Arial";
        ctx.fillStyle = "red";
        if (det.label) {
          ctx.fillText(det.label, x1, y1 - 5);
        }
      });
    },
    extractNameFromDetections(detections) {
      const texts = [];
      detections.forEach((det) => {
        if (Array.isArray(det.texts_gray)) texts.push(...det.texts_gray);
        if (Array.isArray(det.texts_blurred)) texts.push(...det.texts_blurred);
        if (Array.isArray(det.texts_thresh)) texts.push(...det.texts_thresh);
        if (Array.isArray(det.texts)) texts.push(...det.texts);
      });

      const valid = texts.filter(
        (t) => t && t.length >= 3 && /[a-zA-Z]/.test(t)
      );
      return valid[0]?.toUpperCase() || null;
    },
    async checkBoatInBackend(name) {
      const BACKEND_BASE =
        "https://desolate-caverns-71958-8003a607a2e2.herokuapp.com/api/boats/all";
      const MOORING_API =
        "https://desolate-caverns-71958-8003a607a2e2.herokuapp.com/api/moorings";

      try {
        const res = await axios.get(BACKEND_BASE);
        const boats = res.data;

        const boat = boats.find(
          (b) =>
            b.ime_broda &&
            (b.ime_broda.toUpperCase().includes(name.toUpperCase()) ||
              name.toUpperCase().includes(b.ime_broda.toUpperCase()))
        );

        if (!boat) {
          this.message = ` No record found for "${name}".`;
          this.linkText = "Add this boat";
          this.linkTarget = "/DockView";
          return;
        }

        const mooringRes = await axios.get(MOORING_API);
        const moorings = mooringRes.data;

        const mooring = moorings.find((m) => m.boat?._id === boat._id);

        if (mooring) {
          this.message = ` "${boat.ime_broda}" is moored at number ${mooring.number}.`;
          this.linkText = "Check the dock";
          this.linkTarget = "/DockView";
        } else {
          this.message = `  "${boat.ime_broda}" is not currently moored.`;
          this.linkText = "Give the mooring";
          this.linkTarget = "/DockView";
        }
      } catch (err) {
        console.error(err);
        this.message = "❌ Failed to check boat.";
        this.linkText = "";
        this.linkTarget = "";
      }
    },
  },
  computed: {
    formattedDetections() {
      return JSON.stringify(this.lastDetections, null, 2);
    },
  },
  beforeUnmount() {
    this.stopWebcam();
  },
};
</script>

<style scoped>
.scanner {
  padding: 2rem;
  max-width: 700px;
  margin: 4rem auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  font-weight: 600;
  color: #333;
}

button {
  padding: 0.8rem 2rem;
  font-size: 1rem;
  border-radius: 8px;
  border: none;
  background: #4a90e2;
  color: white;
  cursor: pointer;
  transition: background 0.2s ease;
}

button:hover {
  background: #357ac9;
}

.message {
  padding: 1rem;
  background: #eaf7ea;
  border-left: 6px solid #4caf50;
  font-weight: 500;
  font-size: 1rem;
  border-radius: 8px;
  text-align: center;
  color: #2f5d34;
}

.message-link {
  display: block;
  margin-top: 0.5rem;
  color: #4a90e2;
  font-weight: 600;
  text-decoration: none;
}

.message-link:hover {
  text-decoration: underline;
}

.detection-output {
  background: #f8f9fb;
  padding: 1rem;
  border-radius: 8px;
  font-family: monospace;
  font-size: 0.9rem;
  color: #333;
  border: 1px solid #ddd;
  max-height: 400px;
  overflow: auto;
}
</style>
