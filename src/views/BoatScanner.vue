<template>
  <div class="scanner">
    <h2>Add the boat to mooring</h2>

    <button @click="triggerFileInput">Upload boat image</button>
    <input
      type="file"
      @change="handleUpload"
      ref="fileInput"
      style="display: none"
    />

    <!-- ✅ IMAGE PREVIEW -->
    <div v-if="previewUrl" class="preview">
      <h3>📸 Uploaded Image:</h3>
      <img :src="previewUrl" alt="Uploaded Boat" />
    </div>

    <div v-if="message" class="message">
      {{ message }}
      <router-link v-if="linkText" :to="linkTarget" class="message-link">
        {{ linkText }}
      </router-link>
    </div>

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
const previewUrl = ref(""); // ✅ preview
const message = ref("");
const detectionData = ref([]);
const linkText = ref("");
const linkTarget = ref("");

const API_BASE = "http://localhost:8080"; // OCR API
const BACKEND_BASE =
  "https://desolate-caverns-71958-8003a607a2e2.herokuapp.com/api/boats/all"; // Express API
const MOORING_API =
  "https://desolate-caverns-71958-8003a607a2e2.herokuapp.com/api/moorings";

function triggerFileInput() {
  fileInput.value.click();
}

async function handleUpload(e) {
  const file = e.target.files[0];
  if (!file) return;

  previewUrl.value = URL.createObjectURL(file); // ✅ set preview

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
      linkText.value = "Add this boat";
      linkTarget.value = "/DockView";
      return;
    }

    await checkBoatInBackend(name);
  } catch (err) {
    console.error(err);
    message.value = "❌ Upload failed.";
    linkText.value = "";
    linkTarget.value = "";
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
      (b) =>
        b.ime_broda &&
        (b.ime_broda.toUpperCase().includes(name.toUpperCase()) ||
          name.toUpperCase().includes(b.ime_broda.toUpperCase()))
    );

    if (!boat) {
      message.value = `❌ No record found for "${name}".`;
      linkText.value = "Add this boat";
      linkTarget.value = "/DockView";
      return;
    }

    const mooringRes = await axios.get(MOORING_API);
    const moorings = mooringRes.data;

    const mooring = moorings.find((m) => m.boat?._id === boat._id);

    if (mooring) {
      message.value = `✅ 🚤 "${boat.ime_broda}" is moored at number ${mooring.number}.`;
      linkText.value = "Check the dock";
      linkTarget.value = "/DockView";
    } else {
      message.value = `✅ 🚤 "${boat.ime_broda}" is not currently moored.`;
      linkText.value = "Give the mooring";
      linkTarget.value = "/DockView";
    }
  } catch (err) {
    console.error(err);
    message.value = "❌ Failed to check boat.";
    linkText.value = "";
    linkTarget.value = "";
  }
}
</script>

<style scoped>
.scanner {
  padding: 2rem;
  max-width: 800px;
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

.preview {
  text-align: center;
}

.preview img {
  max-width: 100%;
  max-height: 300px;
  border-radius: 8px;
  border: 2px solid #ccc;
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
  margin-top: 1rem;
  background: #f8f9fb;
  padding: 1rem;
  border-radius: 8px;
  font-family: monospace;
  font-size: 0.9rem;
  color: #333;
  border: 1px solid #ddd;
}
</style>
