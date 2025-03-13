<template>
  <div class="reservations-container">
    <h2>Your Reservations</h2>

    <div v-if="loading" class="loading">Loading...</div>
    <div v-else-if="error" class="error">{{ error }}</div>

    <div v-else class="reservations-list">
      <div
        v-for="reservation in reservations"
        :key="reservation._id"
        class="reservation-card"
      >
        <div class="reservation-info">
          <p><strong>Mooring #:</strong> {{ reservation.mooring.number }}</p>
          <p><strong>Boat:</strong> {{ reservation.boat.ime_broda }}</p>
          <p><strong>Owner:</strong> {{ reservation.owner.name }}</p>
          <p><strong>Date:</strong> {{ formatDate(reservation.date) }}</p>
        </div>
        <router-link to="/OwnerHome" class="pay-button">Pay Now</router-link>
      </div>
    </div>
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
        const token = localStorage.getItem("token");

        if (!token) {
          this.error = "User is not authenticated!";
          return;
        }

        const response = await axios.get(
          "http://localhost:5000/api/reservations",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        this.reservations = response.data;
      } catch (err) {
        this.error =
          err.response?.data?.message || "Error fetching reservations.";
        console.error("Fetch error:", err.response || err);
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
  max-width: 800px;
  margin: auto;
  padding: 50px;
  background: #fff;
  font-family: "Montserrat", sans-serif;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h2 {
  color: #0b0f23;
  font-family: "Montserrat", sans-serif;
  margin-bottom: 20px;
}

.loading {
  font-size: 18px;
  font-weight: bold;
}

.error {
  color: red;
  font-size: 18px;
}

.reservations-list {
  display: flex;
  color: #0b0f23;
  flex-direction: column;
  gap: 15px;
  font-family: "Montserrat", sans-serif;
}

.reservation-card {
  background: #fff;
  padding: 50px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.reservation-info {
  text-align: left;
}

.reservation-info p {
  margin: 5px 0;
  font-size: 16px;
}

.pay-button {
  width: 90%;
  text-align: center;
  margin-top: 30px;
  padding: 16px;
  background: #0b0f23;
  color: #fff;
  text-decoration: none;
  font-weight: bold;
  border-radius: 5px;
  transition: background 0.3s;
}
.pay-button:hover {
  background: #3a10e2;
}
</style>
