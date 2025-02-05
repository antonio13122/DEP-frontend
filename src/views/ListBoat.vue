<template>
  <div class="container">
    <h2 class="title">All Boats</h2>
    <div v-if="loading" class="loading-text">Loading...</div>

    <div v-else-if="boats.length > 0" class="boat-list">
      <div v-for="boat in boats" :key="boat._id" class="boat-card">
        <h3>{{ boat.ime_broda }} ({{ boat.broj_broda }})</h3>
        <p><strong>Length:</strong> {{ boat.duzina }}m</p>
        <p><strong>Draft:</strong> {{ boat.gaz }}m</p>
        <p><strong>Type:</strong> {{ boat.vrsta_broda }}</p>
        <p><strong>Owner:</strong> {{ boat.user?.name || "Unknown" }}</p>
      </div>
    </div>

    <div v-else class="no-boats">No boats found.</div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ListBoat",
  data() {
    return {
      boats: [],
      loading: true,
    };
  },
  async created() {
    await this.fetchAllBoats();
  },
  methods: {
    async fetchAllBoats() {
      try {
        const response = await axios.get("http://localhost:5000/api/boats/all");
        this.boats = response.data;
      } catch (error) {
        console.error("Error fetching boats:", error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.container {
  padding: 20px;
  text-align: center;
}

.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 15px;
}

.loading-text {
  font-size: 18px;
  color: gray;
}

.boat-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
}

.boat-card {
  background: #fff;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 250px;
  text-align: left;
}

.no-boats {
  font-size: 18px;
  color: red;
}
</style>
