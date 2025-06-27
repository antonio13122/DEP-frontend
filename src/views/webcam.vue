<template>
  <div>
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

    <!-- Start/Stop Buttons -->
    <div style="margin-top: 10px">
      <button @click="startWebcam" :disabled="stream">Start Webcam</button>
      <button @click="stopWebcam" :disabled="!stream">Stop Webcam</button>
    </div>

    <!-- JSON display under webcam -->
    <pre
      style="
        margin-top: 20px;
        padding: 10px;
        background: #f5f5f5;
        border: 1px solid #ccc;
        max-height: 400px;
        overflow: auto;
      "
      >{{ formattedDetections }}</pre
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      stream: null,
      intervalId: null,
      width: 640,
      height: 480,
      lastDetections: [],
    };
  },
  methods: {
    async startWebcam() {
      if (this.stream) return; // already running

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

        if (det.boat_name) {
          ctx.fillStyle = "white";
          ctx.fillText(`Boat: ${det.boat_name}`, x1, y2 + 20);
        }

        if (Array.isArray(det.texts)) {
          det.texts.forEach((txt, i) => {
            ctx.fillStyle = "white";
            ctx.fillText(txt, x1, y2 + 40 + i * 20);
          });
        }
      });
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
