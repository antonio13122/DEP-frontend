<template>
  <div class="scanner">
    <button @click="triggerFileInput">Upload Image</button>
    <input
      type="file"
      @change="handleUpload"
      ref="fileInput"
      style="display: none"
    />
    <button @click="useWebcam">Capture Webcam Snapshot</button>

    <div v-if="message" class="message">
      {{ message }}
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const fileInput = ref(null);
const message = ref("");

const API_BASE = "http://localhost:8080"; // Your FastAPI backend
const BACKEND_BASE =
  "https://desolate-caverns-71958-8003a607a2e2.herokuapp.com/api/boats/all"; // Your Express backend

function triggerFileInput() {
  fileInput.value.click();
}

async function handleUpload(e) {
  const file = e.target.files[0];
  if (!file) return;

  const isVideo = file.type.includes("video");
  const endpoint = isVideo ? "/detect_video" : "/detect";

  const formData = new FormData();
  formData.append(isVideo ? "video" : "image", file);

  try {
    const { data } = await axios.post(`${API_BASE}${endpoint}`, formData);
    const name = data.most_likely_boat_name || extractNameFromDetections(data);
    if (!name) {
      message.value = "No boat name detected";
      return;
    }

    await checkBoatInBackend(name);
  } catch (err) {
    console.error(err);
    message.value = "Upload failed";
  }
}

async function useWebcam() {
  try {
    const video = document.createElement("video");
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
    await video.play();

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0);

    const base64 = canvas.toDataURL("image/jpeg").split(",")[1];
    stream.getTracks().forEach((track) => track.stop());

    const { data } = await axios.post(`${API_BASE}/detect_frame`, {
      image: base64,
    });

    const name = extractNameFromDetections(data);
    if (!name) {
      message.value = "No boat name detected from webcam";
      return;
    }

    await checkBoatInBackend(name);
  } catch (err) {
    console.error(err);
    message.value = "Webcam capture failed";
  }
}

function extractNameFromDetections(data) {
  const texts = [];
  data.detections?.forEach((det) => {
    texts.push(...(det.texts_gray || []));
    texts.push(...(det.texts_blurred || []));
    texts.push(...(det.texts_thresh || []));
  });
  return texts.find((t) => /^[A-Z0-9\s]{3,}$/.test(t))?.toUpperCase() || null;
}

async function checkBoatInBackend(name) {
  try {
    const res = await axios.get(BACKEND_BASE); // GET all boats
    const boats = res.data;

    const boat = boats.find(
      (b) => b.ime_broda && b.ime_broda.toUpperCase() === name.toUpperCase()
    );

    if (boat) {
      message.value = `🚤 ${boat.ime_broda} is moored at ${
        boat.mooring || "unknown"
      }`;
    } else {
      message.value = `No record found for "${name}"`;
    }
  } catch (err) {
    console.error(err);
    message.value = "Failed to check boat";
  }
}
</script>

<style scoped>
.scanner {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-width: 400px;
  margin: 0 auto;
}

button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
}

.message {
  margin-top: 1rem;
  padding: 1rem;
  background-color: pink;
  color: black;
  font-weight: bold;
  font-size: 1.2rem;
  border-radius: 8px;
  text-align: center;
}
</style>
