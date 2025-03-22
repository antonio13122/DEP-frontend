<template>
  <div class="mooring-container">
    <router-link to="/OwnerHome">
      <img src="@/assets/back_icon.png" alt="Back Icon" class="back-icon" />
    </router-link>

    <div class="mooring-grid">
      <div
        v-for="mooring in leftMoorings"
        :key="mooring._id"
        :class="[
          'mooring',
          mooring.boat ? 'occupied' : 'available',
          selectedMooring === mooring._id ? 'selected' : '',
        ]"
        @click="
          !mooring.boat && !boatHasMooring ? selectMooring(mooring) : null
        "
      >
        {{ mooring.number }}
      </div>
    </div>

    <div class="dock"></div>

    <div class="mooring-grid">
      <div
        v-for="mooring in rightMoorings"
        :key="mooring._id"
        :class="[
          'mooring',
          mooring.boat ? 'occupied' : 'available',
          selectedMooring === mooring._id ? 'selected' : '',
        ]"
        @click="
          !mooring.boat && !boatHasMooring ? selectMooring(mooring) : null
        "
      >
        {{ mooring.number }}
      </div>
    </div>

    <div
      v-if="popupVisible"
      class="popup-overlay"
      @click="popupVisible = false"
    >
      <div class="popup" @click.stop>
        <span class="close-btn" @click="popupVisible = false">×</span>
        <h3>Mooring #{{ selectedMooring.number }}</h3>
        <p>Max Gaz: {{ selectedMooring.max_gaz }}m</p>

        <button
          @click="bookBerth"
          :disabled="!selectedMooring || boatHasMooring"
          class="book-button"
        >
          Book Berth
        </button>
      </div>
    </div>

    <div v-if="error" class="error">
      <span>You already booked.</span><br />
      <span>
        <router-link to="/AppointmentForm" class="contact-link"
          >Contact us</router-link
        >
        for change.
      </span>
    </div>
    <div v-if="successMessage" class="success">
      {{ successMessage }}<br />
      <span class="reservation-link">
        →
        <router-link to="/reservationpage" class="contact-link"
          >View Reservation</router-link
        >
      </span>
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
      error: null,
      successMessage: null,
      boat: null,
      popupVisible: false,
    };
  },
  computed: {
    leftMoorings() {
      return this.moorings.slice(0, 20);
    },
    rightMoorings() {
      return this.moorings.slice(20, 40);
    },
    boatHasMooring() {
      return this.boat && this.boat.mooringId;
    },
  },
  async mounted() {
    await this.fetchMoorings();
    await this.fetchUserBoat();
  },
  methods: {
    async fetchMoorings() {
      try {
        const response = await axios.get(
          "https://desolate-caverns-71958-8003a607a2e2.herokuapp.com/api/moorings"
        );
        this.moorings = response.data;
      } catch (err) {
        this.error = "Error fetching moorings.";
        console.error("Error fetching moorings", err);
      }
    },
    async fetchUserBoat() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://desolate-caverns-71958-8003a607a2e2.herokuapp.com/api/boats",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.data && response.data.length > 0) {
          this.boat = response.data[0];
        } else {
          this.boat = null;
          this.error = "No boat found.";
        }
      } catch (err) {
        this.error = "Error fetching boat.";
        console.error("Error fetching boat", err);
      }
    },
    selectMooring(mooring) {
      if (!this.boatHasMooring) {
        this.selectedMooring = mooring;
        this.popupVisible = true;
      }
    },
    async bookBerth() {
      if (!this.boat) {
        this.error = "You don't have a boat.";
        this.popupVisible = false;
        return;
      }
      if (this.boatHasMooring) {
        this.error = "You already have a booked mooring!";
        this.popupVisible = false;
        return;
      }
      if (!this.selectedMooring) {
        this.error = "Please select a mooring.";
        this.popupVisible = false;
        return;
      }
      try {
        await axios.post(
          `https://desolate-caverns-71958-8003a607a2e2.herokuapp.com/api/moorings/${this.selectedMooring._id}/add`,
          { boatId: this.boat._id }
        );
        await axios.post(
          "https://desolate-caverns-71958-8003a607a2e2.herokuapp.com/api/reservations",
          {
            boat: this.boat._id,
            owner: this.boat.user,
            mooring: this.selectedMooring._id,
          }
        );
        this.successMessage = "You have booked the berth!";
        this.error = null;
      } catch (err) {
        this.error = err.response?.data?.error || "Error booking berth.";
        console.error("Error booking berth", err);
      } finally {
        this.popupVisible = false;
      }
    },
  },
};
</script>

<style scoped>
.mooring-container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 125vh;
  background: #0b0f23;
  padding: 40px;
  margin-left: 130px;
  position: relative;
}
.success {
  position: absolute;
  font-family: "Montserrat", sans-serif;
  font-size: 68px;
  font-weight: bold;
  color: white;
  top: -1%;
  left: 540px;
  text-align: left;
  line-height: 0.33;
  white-space: nowrap;
}
.mooring-grid,
.dock {
  display: grid;
  grid-template-rows: repeat(20, 1fr);
  gap: 14px;
  margin-right: 14px;
  margin-left: 14px;
}

.dock {
  background: white;
  width: 80px;
  height: 100%;
  border: 2px solid black;
}

.mooring {
  width: 150px;
  font-family: "Montserrat", sans-serif;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  color: #0b0f23;
  border-radius: 5px;
  cursor: pointer;
}

.available {
  background-color: green;
}

.occupied {
  background-color: white;
  cursor: not-allowed;
}

.selected {
  background-color: #8233c5;
}

.back-icon {
  position: absolute;
  top: 10px;
  left: -100px;
  width: 60px;
  height: 60px;
  cursor: pointer;
}

.book-button {
  padding: 10px 20px;
  font-size: 16px;
  background: #e963fd;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: white;
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
}

.book-button:disabled {
  background: gray;
  cursor: not-allowed;
}

.error {
  color: red;
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
}

.success {
  color: lightgreen;
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
}

.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.popup {
  background-color: white;
  padding: 150px 200px;
  border-radius: 8px;
  text-align: center;
  max-width: 300px;
  width: 100%;
  position: relative;
  z-index: 10000;
}

.popup .close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 30px;
  color: blue;
  cursor: pointer;
}

.popup h3 {
  font-size: 30px;
  margin-bottom: 10px;
  color: #0b0f23;
  font-family: "Montserrat", sans-serif;
}

.popup p {
  font-size: 24px;
  color: #0b0f23;
  font-family: "Montserrat", sans-serif;
}

.popup button {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #0b0f23;
  border: none;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}
.success {
  position: absolute;
  font-family: "Montserrat", sans-serif;
  font-size: 50px;
  font-weight: bold;
  color: white;
  top: 40%;
  left: 68%;
  transform: translateX(-50%);
  text-align: center;
  white-space: nowrap;
}
.error {
  position: absolute;
  font-family: "Montserrat", sans-serif;
  font-size: 50px;
  font-weight: bold;
  color: white;
  top: 40%;
  left: 68%;
  transform: translateX(-50%);
  text-align: center;
  text-decoration: none;
  white-space: nowrap;
}

.contact-link {
  color: blue;
  text-decoration: underline;
  cursor: pointer;
}
.reservation-link {
  font-size: 30px;
  font-weight: normal;
  display: block;
  margin-top: 30px;
}

.contact-link {
  color: #00bfff;
  text-decoration: none;
  font-weight: bold;
  margin-left: 10px;
}

.contact-link:hover {
  color: white;
}
</style>
