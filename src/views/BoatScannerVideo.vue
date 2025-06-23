<template>
  <div>
    <h2>Upload Video</h2>
    <input type="file" accept="video/*" @change="handleVideoChange" />
    <button @click="uploadVideo">Upload</button>

    <div v-if="result">
      <p>
        <strong>Detected Boat Name:</strong> {{ result.most_likely_boat_name }}
      </p>
      <video
        v-if="result.output_path"
        controls
        :src="videoSrc"
        width="480"
      ></video>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// ✅ API base URL defined directly in the component
const API_BASE = "http://localhost:8080"; // Change this as needed

const videoFile = ref(null);
const result = ref(null);
const videoSrc = ref("");

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

    // Build video path assuming same server hosts it
    videoSrc.value = `${API_BASE}/${data.output_path}`;
  } catch (err) {
    console.error(err);
    alert("Video upload failed.");
  }
}
</script>
