<template>
  <div class="book-berth">
    <router-link to="/OwnerHome">
      <img src="@/assets/back_icon.png" alt="Back Icon" class="back-icon" />
    </router-link>
    <h1>Book a Berth</h1>

    <div v-if="loading" class="loading">Loading...</div>
    <div v-else>
      <div class="mooring-list">
        <h2>Available Moorings</h2>
        <ul>
          <li
            v-for="mooring in moorings"
            :key="mooring._id"
            :class="{ selected: selectedMooring === mooring._id }"
            @click="selectMooring(mooring._id)"
          >
            Mooring #{{ mooring.number }} - Max Gaz: {{ mooring.max_gaz }}m
          </li>
        </ul>
      </div>

      <button @click="bookBerth" :disabled="!selectedMooring">
        Book Berth
      </button>

      <div v-if="error" class="error">{{ error }}</div>
      <div v-if="successMessage" class="success">{{ successMessage }}</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "BookBerth",
  data() {
    return {
      moorings: [],
      selectedMooring: null,
      loading: true,
      error: null,
      successMessage: null,
      boat: null,
    };
  },
  async mounted() {
    await this.fetchMoorings();
    await this.fetchUserBoat();
  },
  methods: {
    async fetchMoorings() {
      try {
        const response = await axios.get("http://localhost:5000/api/moorings");
        this.moorings = response.data;
      } catch (err) {
        this.error = "Error fetching ";
        console.error("Error fetching ", err);
      } finally {
        this.loading = false;
      }
    },
    async fetchUserBoat() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/boats", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data && response.data.length > 0) {
          this.boat = response.data[0];
        } else {
          this.error = "No boat found.";
        }
      } catch (err) {
        this.error = "Error fetching .";
        console.error("Error fetching:", err);
      }
    },
    selectMooring(id) {
      this.selectedMooring = id;
    },
    async bookBerth() {
      if (!this.boat) {
        this.error = "You don't have a boat .";
        return;
      }

      if (!this.selectedMooring) {
        this.error = "Please select a mooring.";
        return;
      }

      try {
        await axios.post(
          `http://localhost:5000/api/moorings/${this.selectedMooring}/add`,
          { boatId: this.boat._id } //boat korisnikov
        );
        this.successMessage = "You have booked the berth!";
        this.error = null;
      } catch (err) {
        this.error = "Error booking berth.";
        console.error("Error booking berth:", err);
      }
    },
  },
};
</script>

<style scoped>
.book-berth {
  text-align: center;
  padding: 20px;
  font-family: "Montserrat", sans-serif;
  color: white;
}

.back-icon {
  position: absolute;
  top: 10px;
  left: 20px;
  width: 30px;
  height: 30px;
  cursor: pointer;
}

h1 {
  margin-bottom: 20px;
}

.mooring-list {
  margin: 20px auto;
  padding: 10px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  width: 80%;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  padding: 10px;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.2);
  margin: 5px 0;
  border-radius: 5px;
}

li:hover {
  background: rgba(255, 255, 255, 0.4);
}

.selected {
  background: #8233c5;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  background: #e963fd;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: white;
}

button:disabled {
  background: gray;
  cursor: not-allowed;
}

.error {
  color: red;
  margin-top: 10px;
}

.success {
  color: lightgreen;
  margin-top: 10px;
}
</style>
