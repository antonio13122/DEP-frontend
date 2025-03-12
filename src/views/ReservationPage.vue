<template>
  <div class="reservations-container">
    <h2>Your Reservations</h2>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <ul v-else>
      <li v-for="reservation in reservations" :key="reservation._id">
        <strong>Mooring #:</strong> {{ reservation.mooring.number }} |
        <strong>Boat:</strong> {{ reservation.boat.ime_broda }} |
        <strong>Owner:</strong> {{ reservation.owner.name }} |
        <strong>Date:</strong> {{ formatDate(reservation.date) }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      reservations: [],
      loading: true,
      error: null,
    };
  },
  async mounted() {
    await this.fetchReservations();
  },
  methods: {
    async fetchReservations() {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/reservations"
        );
        this.reservations = response.data;
      } catch (err) {
        this.error = "Error fetching reservations.";
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString() + " " + date.toLocaleTimeString();
    },
  },
};
</script>

<style scoped>
.reservations-container {
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: auto;
}

h2 {
  text-align: center;
  color: #333;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  background: #f9f9f9;
  margin: 10px 0;
  padding: 10px;
  border-radius: 5px;
}

.error {
  color: red;
  text-align: center;
}
</style>
