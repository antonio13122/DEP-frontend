<template>
  <div class="scanner">
    <h2>Upload Video</h2>
    <input type="file" accept="video/*" @change="handleVideoChange" />
    <button @click="uploadVideo">Upload Video</button>

    <div v-if="result" class="message">
      <p>
        <strong>Detected Boat Name:</strong>
        {{ result.most_likely_boat_name || "None" }}
      </p>

      <video
        v-if="result.output_path"
        controls
        :src="videoSrc"
        width="480"
      ></video>

      <div v-if="message" class="backend-message">
        {{ message }}
        <router-link v-if="linkText" :to="linkTarget" class="message-link">
          {{ linkText }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const API_BASE = "http://localhost:8080";
const BACKEND_BASE =
  "https://desolate-caverns-71958-8003a607a2e2.herokuapp.com/api/boats/all";
const MOORING_API =
  "https://desolate-caverns-71958-8003a607a2e2.herokuapp.com/api/moorings";

const videoFile = ref(null);
const result = ref(null);
const videoSrc = ref("");

const message = ref("");
const linkText = ref("");
const linkTarget = ref("");

function handleVideoChange(event) {
  videoFile.value = event.target.files[0];
}

async function uploadVideo() {
  if (!videoFile.value) return alert("Please select a video file.");

  const formData = new FormData();
  formData.append("video", videoFile.value);

  try {
    const response = await fetch(`${API_BASE}/detect_video`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    result.value = data;

    videoSrc.value = `${API_BASE}/${data.output_path}`;

    const name = data.most_likely_boat_name;
    if (name && name.length >= 3) {
      await checkBoatInBackend(name);
    } else {
      message.value = " No valid boat name detected.";
      linkText.value = "";
      linkTarget.value = "";
    }
  } catch (err) {
    console.error(err);
    alert("Video upload failed.");
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
      message.value = `"${boat.ime_broda}" is moored at number ${mooring.number}.`;
      linkText.value = "Check the dock";
      linkTarget.value = "/DockView";
    } else {
      message.value = ` "${boat.ime_broda}" is not currently moored.`;
      linkText.value = "Give the mooring";
      linkTarget.value = "/DockView";
    }
  } catch (err) {
    console.error(err);
    message.value = "Failed to check boat.";
    linkText.value = "";
    linkTarget.value = "";
  }
}
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

input[type="file"] {
  margin: 0 auto;
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
  margin-top: 1rem;
}

.backend-message {
  padding: 1rem;
  background: #eaf7ea;
  border-left: 6px solid #4caf50;
  font-weight: 500;
  font-size: 1rem;
  border-radius: 8px;
  text-align: center;
  color: #2f5d34;
  margin-top: 1rem;
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
