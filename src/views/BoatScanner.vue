<template>
  <div class="scanner">
    <!-- Upload & Webcam Buttons -->
    <button @click="triggerFileInput">📷 Upload Image</button>
    <input
      type="file"
      @change="handleUpload"
      ref="fileInput"
      style="display: none"
    />
    <button @click="useWebcam">🎥 Capture Webcam Snapshot</button>

    <!-- Result Message -->
    <div v-if="message" class="message">{{ message }}</div>

    <!-- OCR Detection Output -->
    <div v-if="detectionData.length" class="detection-output">
      <h3>🔍 OCR Detected Names:</h3>
      <ul>
        <li v-for="(det, index) in detectionData" :key="index">
          <strong>Detection #{{ index + 1 }}</strong
          ><br />
          <span><b>Gray:</b> {{ det.texts_gray?.join(", ") }}</span
          ><br />
          <span><b>Blurred:</b> {{ det.texts_blurred?.join(", ") }}</span
          ><br />
          <span><b>Thresh:</b> {{ det.texts_thresh?.join(", ") }}</span
          ><br />
          <span><b>BBox:</b> {{ det.bbox.join(", ") }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const fileInput = ref(null);
const message = ref("");
const detectionData = ref([]);

const API_BASE = "http://localhost:8080"; // FastAPI OCR API
const BACKEND_BASE =
  "https://desolate-caverns-71958-8003a607a2e2.herokuapp.com/api/boats/all"; // Express API (MongoDB)
const MOORING_API =
  "https://desolate-caverns-71958-8003a607a2e2.herokuapp.com/api/moorings";

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
    detectionData.value = data.detections || [];

    const name = data.most_likely_boat_name || extractNameFromDetections(data);
    if (!name) {
      message.value = "❌ No boat name detected.";
      return;
    }

    await checkBoatInBackend(name);
  } catch (err) {
    console.error(err);
    message.value = "❌ Upload failed.";
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

    detectionData.value = data.detections || [];
    const name = extractNameFromDetections(data);

    if (!name) {
      message.value = "❌ No boat name detected from webcam.";
      return;
    }

    await checkBoatInBackend(name);
  } catch (err) {
    console.error(err);
    message.value = "❌ Webcam capture failed.";
  }
}

function extractNameFromDetections(data) {
  const texts = [];
  data.detections?.forEach((det) => {
    texts.push(...(det.texts_gray || []));
    texts.push(...(det.texts_blurred || []));
    texts.push(...(det.texts_thresh || []));
  });

  const valid = texts.filter((t) => t && t.length >= 3 && /[a-zA-Z]/.test(t));
  return valid[0]?.toUpperCase() || null;
}

async function checkBoatInBackend(name) {
  try {
    const res = await axios.get(BACKEND_BASE);
    const boats = res.data;

    const boat = boats.find(
      (b) => b.ime_broda && b.ime_broda.toUpperCase() === name.toUpperCase()
    );

    if (!boat) {
      message.value = `❌ No record found for "${name}".`;
      return;
    }

    // Get moorings and find the one where this boat is moored
    const mooringRes = await axios.get(MOORING_API);
    const moorings = mooringRes.data;

    const mooring = moorings.find((m) => m.boat?._id === boat._id);

    if (mooring) {
      message.value = `✅ 🚤 "${boat.ime_broda}" is moored at number ${mooring.number}.`;
    } else {
      message.value = `✅ 🚤 "${boat.ime_broda}" is not currently moored.`;
    }
  } catch (err) {
    console.error(err);
    message.value = "❌ Failed to check boat.";
  }
}
</script>

<style scoped>
.scanner {
  padding: 2rem;
  max-width: 600px;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: #f4faff;
  border-radius: 10px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
}

button {
  padding: 0.7rem 1.5rem;
  font-size: 1rem;
  border-radius: 6px;
  border: none;
  background-color: #4a90e2;
  color: white;
  cursor: pointer;
}

button:hover {
  background-color: #357ac9;
}

.message {
  padding: 1rem;
  background-color: pink;
  font-weight: bold;
  font-size: 1.1rem;
  border-radius: 8px;
  text-align: center;
  color: #333;
}

.detection-output {
  margin-top: 1rem;
  background-color: #fff4f9;
  padding: 1rem;
  border-radius: 8px;
  font-family: monospace;
  font-size: 0.95rem;
  color: #333;
  border: 1px solid #e6cce2;
}
</style>
