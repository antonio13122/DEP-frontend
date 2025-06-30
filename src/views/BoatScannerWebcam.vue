<template>
  <div class="webcam-detector">
    <button v-if="!showWebcam" @click="startWebcam">Start Camera</button>

    <div v-if="showWebcam" class="webcam-container">
      <h2>Webcam Boat Detector</h2>
      <video ref="video" autoplay playsinline width="480"></video>

      <div class="actions">
        <button @click="captureAndDetect">Detect Boat</button>
        <button @click="stopWebcam">Stop Camera</button>
      </div>

      <div v-if="message" class="message">
        {{ message }}
        <router-link v-if="linkText" :to="linkTarget" class="message-link">
          {{ linkText }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from "vue";
import axios from "axios";

const API_BASE = "http://localhost:8080";
const BACKEND_BASE =
  "https://desolate-caverns-71958-8003a607a2e2.herokuapp.com/api/boats/all";
const MOORING_API =
  "https://desolate-caverns-71958-8003a607a2e2.herokuapp.com/api/moorings";

const video = ref(null);
const stream = ref(null);

const showWebcam = ref(false);
const message = ref("");
const linkText = ref("");
const linkTarget = ref("");

async function startWebcam() {
  showWebcam.value = true;

  await nextTick();

  try {
    stream.value = await navigator.mediaDevices.getUserMedia({ video: true });
    video.value.srcObject = stream.value;
    message.value = "";
    linkText.value = "";
    linkTarget.value = "";
  } catch (err) {
    alert("Could not access webcam: " + err.message);
  }
}

function stopWebcam() {
  if (stream.value) {
    stream.value.getTracks().forEach((track) => track.stop());
    stream.value = null;
  }
  showWebcam.value = false;
}

async function captureAndDetect() {
  const videoEl = video.value;
  if (!videoEl) return;

  // Capture frame
  const canvas = document.createElement("canvas");
  canvas.width = videoEl.videoWidth;
  canvas.height = videoEl.videoHeight;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(videoEl, 0, 0, canvas.width, canvas.height);

  const base64Image = canvas.toDataURL("image/jpeg");

  try {
    const response = await fetch(`${API_BASE}/detect_frame`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image: base64Image }),
    });

    const data = await response.json();
    const det = data?.detections?.[0] || {};
    let name = det.boat_name;

    if (!name || name.length < 3) {
      if (Array.isArray(det.texts_gray) && det.texts_gray[0]) {
        name = det.texts_gray[0];
      } else if (Array.isArray(det.texts_blurred) && det.texts_blurred[0]) {
        name = det.texts_blurred[0];
      } else if (Array.isArray(det.texts_thresh) && det.texts_thresh[0]) {
        name = det.texts_thresh[0];
      }
    }

    if (name && name.length >= 3) {
      await checkBoatInBackend(name);
    } else {
      message.value = " No valid boat name detected.";
      linkText.value = "";
      linkTarget.value = "";
    }
  } catch (err) {
    alert("Detection request failed: " + err.message);
  }
}

async function checkBoatInBackend(name) {
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
      message.value = ` No record found for "${name}".`;
      linkText.value = "Add this boat";
      linkTarget.value = "/DockView";
      return;
    }

    const mooringRes = await axios.get(MOORING_API);
    const moorings = mooringRes.data;

    const mooring = moorings.find((m) => m.boat?._id === boat._id);

    if (mooring) {
      message.value = ` "${boat.ime_broda}" is moored at number ${mooring.number}.`;
      linkText.value = "Check the dock";
      linkTarget.value = "/DockView";
    } else {
      message.value = ` "${boat.ime_broda}" is not currently moored.`;
      linkText.value = "Give the mooring";
      linkTarget.value = "/DockView";
    }
  } catch (err) {
    console.error(err);
    message.value = " Failed to check boat.";
    linkText.value = "";
    linkTarget.value = "";
  }
}
</script>

<style scoped>
.webcam-detector {
  max-width: 500px;
  margin: 4rem auto;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.actions {
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
  justify-content: center;
}

button {
  padding: 0.8rem 1.5rem;
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
  margin-top: 1.5rem;
  padding: 1rem;
  background: #eaf7ea;
  border-left: 6px solid #4caf50;
  border-radius: 8px;
  font-weight: 500;
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
</style>
