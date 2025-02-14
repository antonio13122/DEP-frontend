<template>
  <div class="container">
    <div class="anchor-container">
      <router-link to="/OwnerHome">
        <img
          class="anchor-icon"
          :src="require('@/assets/anchor_icon.png')"
          alt="Book Berth"
        />
      </router-link>
    </div>

    <div class="boat-box">
      <h2 class="boat-title">My Boat</h2>
      <div v-if="loading" class="loading-text">Loading...</div>

      <div v-else-if="boat" class="boat-details">
        <div class="input-group">
          <label>Boat Name</label>
          <input type="text" :value="boat.ime_broda" disabled />
        </div>
        <div class="input-group">
          <label>Boat Number</label>
          <input type="text" :value="boat.broj_broda" disabled />
        </div>
        <div class="input-group">
          <label>Length (m)</label>
          <input type="text" :value="boat.duzina" disabled />
        </div>
        <div class="input-group">
          <label>Draft (m)</label>
          <input type="text" :value="boat.gaz" disabled />
        </div>
        <div class="input-group">
          <label>Type</label>
          <input type="text" :value="boat.vrsta_broda" disabled />
        </div>
      </div>

      <div v-else class="boat-details">
        <h2 class="form-title">Add a New Boat</h2>
        <form @submit.prevent="addBoat">
          <div class="input-group">
            <label>Boat Name</label>
            <input v-model="newBoat.ime_broda" type="text" required />
          </div>
          <div class="input-group">
            <label>Boat Number</label>
            <input v-model="newBoat.broj_broda" type="number" required />
          </div>
          <div class="input-group">
            <label>Length (m)</label>
            <input v-model="newBoat.duzina" type="number" required />
          </div>
          <div class="input-group">
            <label>Draft (m)</label>
            <input v-model="newBoat.gaz" type="number" required />
          </div>
          <div class="input-group">
            <label>Type</label>
            <select v-model="newBoat.vrsta_broda" required>
              <option disabled value="">Select Boat Type</option>
              <option value="catamaran">Catamaran</option>
              <option value="sailboat">Sailboat</option>
              <option value="motoryacht">Motor Yacht</option>
              <option value="jet ski">Jet Ski</option>
            </select>
          </div>
          <button type="submit" class="boat-button">Add Boat</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "OwnerHome",
  data() {
    return {
      boat: null,
      newBoat: {
        broj_broda: "",
        ime_broda: "",
        duzina: "",
        gaz: "",
        vrsta_broda: "",
      },
      loading: true,
    };
  },
  async created() {
    await this.fetchBoat();
  },
  methods: {
    async fetchBoat() {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await axios.get("http://localhost:5000/api/boats", {
          headers: { Authorization: token },
        });

        if (response.data.length > 0) {
          this.boat = response.data[0];
        }
      } catch (error) {
        console.error("Error fetching boat:", error);
      } finally {
        this.loading = false;
      }
    },
    async addBoat() {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await axios.post(
          "http://localhost:5000/api/boats",
          this.newBoat,
          { headers: { Authorization: token } }
        );

        this.boat = response.data;
      } catch (error) {
        console.error("Error adding boat:", error);
      }
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background: linear-gradient(to bottom right, #0b0f23, #0d1b3d);
  padding: 20px;
}

.anchor-container {
  position: absolute;
  left: 20px;
  top: 20px;
}

.anchor-icon {
  width: 50px;
  height: 50px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.anchor-icon:hover {
  transform: scale(1.1);
}

.boat-box {
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 800px;
  text-align: center;
  margin: auto;
}

.boat-title {
  font-size: 36px;
  font-weight: 600;
  color: #0b0f23;
  margin-bottom: 20px;
  font-family: "Montserrat", sans-serif;
}

/* Input Groups */
.input-group {
  text-align: left;
  margin-bottom: 15px;
}

.input-group label {
  font-size: 14px;
  color: #555;
  display: block;
  margin-bottom: 5px;
}

.input-group input,
.input-group select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
}

/* Add Boat Button */
.boat-button {
  width: 100%;
  padding: 15px;
  background: #0b0f23;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 10px;
  transition: background 0.3s ease;
}

.boat-button:hover {
  background: #002db3;
}
</style>
