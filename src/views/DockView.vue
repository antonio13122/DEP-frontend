<template>
  <div class="mooring-container">
    <router-link to="/SailorHome">
      <img src="@/assets/back_icon.png" alt="Back Icon" class="back-icon" />
    </router-link>
    <div class="mooring-grid">
      <div
        v-for="mooring in leftMoorings"
        :key="mooring._id"
        :class="['mooring', mooring.boat ? 'occupied' : 'available']"
        @click="showBoatDetails(mooring.boat)"
      >
        <span v-if="mooring.boat" class="boat-name">{{
          mooring.boat.ime_broda
        }}</span>
      </div>
    </div>
    <div class="dock"></div>
    <div class="mooring-grid">
      <div
        v-for="mooring in rightMoorings"
        :key="mooring._id"
        :class="['mooring', mooring.boat ? 'occupied' : 'available']"
        @click="showBoatDetails(mooring.boat)"
      >
        <span v-if="mooring.boat" class="boat-name">{{
          mooring.boat.ime_broda
        }}</span>
      </div>
    </div>

    <div class="boat-details" v-if="selectedBoat">
      <h3>Boat Details</h3>
      <p><strong>Name:</strong> {{ selectedBoat.ime_broda }}</p>
      <p><strong>Type:</strong> {{ selectedBoat.vrsta_broda }}</p>
      <p><strong>Length:</strong> {{ selectedBoat.duzina }} meters</p>
      <p><strong>Draft:</strong> {{ selectedBoat.gaz }} meters</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      moorings: [], // dodati dva buttona i dvije funkcije za isplov/uplov novog broda
      selectedBoat: null, // spremi detalje broda u varijablu
    };
  },
  computed: {
    leftMoorings() {
      return this.moorings.slice(0, 20);
    },
    rightMoorings() {
      return this.moorings.slice(20, 40);
    },
  },
  methods: {
    showBoatDetails(boat) {
      if (boat) {
        this.selectedBoat = boat;
      } else {
        this.selectedBoat = null;
      }
    },
  },
  async created() {
    try {
      const response = await fetch("http://localhost:5000/api/moorings");
      const data = await response.json();

      console.log("Mooring Data:", data);

      this.moorings = data;
    } catch (error) {
      console.error("Error fetching moorings:", error);
    }
  },
};
</script>
<style scoped>
.mooring-container {
  display: flex;
  justify-content: flex-start; /* Align items to the left */
  align-items: center; /* Center content vertically */
  height: 125vh;
  background: #0b0f23;
  padding: 40px;
  margin-left: 130px;
  position: relative;
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
  /* Shift the dock to the left */
  margin-left: 15; /* removed the margin */
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
}

.available {
  background-color: green;
}

.occupied {
  background-color: white;
}

.boat-name {
  padding: 5px;
}

.back-icon {
  position: absolute;
  top: 10px;
  left: -100px;
  width: 60px;
  height: 60px;
  cursor: pointer;
}

.boat-details {
  position: absolute;
  font-family: "Montserrat", sans-serif;
  font-weight: bold;
  top: 350px;
  left: 55%;
  transform: translateX(-50%); /* Center the details horizontally */
  width: 400px;
  padding: 20px;
  background-color: #fff;
  border: 2px solid #000;
  border-radius: 8px;
  color: #000;
}

.boat-details h3 {
  margin-top: 0;
}

.boat-details p {
  font-size: 14px;
  margin: 10px 0;
}
</style>
