<template>
  <div>
    <h2>Webcam Boat Detector</h2>
    <video ref="video" autoplay playsinline width="480"></video>
    <button @click="captureAndDetect">Detect Boat</button>

    <div v-if="detections">
      <h3>Detections:</h3>
      <pre>{{ detections }}</pre>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const video = ref(null);
const detections = ref(null);

// Start webcam on mount -- change later
onMounted(async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.value.srcObject = stream;
  } catch (err) {
    alert("Could not access webcam: " + err.message);
  }
});

async function captureAndDetect() {
  const videoEl = video.value;
  if (!videoEl) return;

  // capute frame
  const canvas = document.createElement("canvas");
  canvas.width = videoEl.videoWidth;
  canvas.height = videoEl.videoHeight;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(videoEl, 0, 0, canvas.width, canvas.height);

  // Get base64 image string
  const base64Image = canvas.toDataURL("image/jpeg");

  try {
    const response = await fetch("http://localhost:8080/detect_frame", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image: base64Image }),
    });

    const data = await response.json();
    detections.value = data.detections || data.error;
  } catch (err) {
    alert("Detection request failed: " + err.message);
  }
}
</script>
