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
        @click="
          mooring.boat ? showBoatDetails(mooring) : showAddBoatForm(mooring)
        "
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
        @click="
          mooring.boat ? showBoatDetails(mooring) : showAddBoatForm(mooring)
        "
      >
        <span v-if="mooring.boat" class="boat-name">{{
          mooring.boat.ime_broda
        }}</span>
      </div>
    </div>

    <div class="boat-details" v-if="selectedMooring && selectedMooring.boat">
      <button class="close-button" @click="closePopup">✖</button>
      <h3>Boat Details</h3>
      <p><strong>Name:</strong> {{ selectedMooring.boat.ime_broda }}</p>
      <p><strong>Type:</strong> {{ selectedMooring.boat.vrsta_broda }}</p>
      <p><strong>Length:</strong> {{ selectedMooring.boat.duzina }} meters</p>
      <p><strong>Draft:</strong> {{ selectedMooring.boat.gaz }} meters</p>
      <button @click="removeBoat(selectedMooring._id)" class="remove-button">
        Remove Boat
      </button>
    </div>

    <div class="boat-details" v-if="selectedEmptyMooring">
      <button class="close-button" @click="closePopup">✖</button>
      <h3>Add Boat</h3>
      <label for="boatSelect"><strong>Select Boat:</strong></label>
      <select v-model="selectedBoatId" id="boatSelect">
        <option
          v-for="boat in availableBoatsFiltered"
          :key="boat._id"
          :value="boat._id"
        >
          {{ boat.ime_broda }} ({{ boat.vrsta_broda }})
        </option>
      </select>
      <button @click="addBoat(selectedEmptyMooring._id)" class="add-button">
        Add Boat
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      moorings: [],
      availableBoats: [],
      selectedMooring: null,
      selectedEmptyMooring: null,
      selectedBoatId: null,
    };
  },
  computed: {
    leftMoorings() {
      return this.moorings.slice(0, 20);
    },
    rightMoorings() {
      return this.moorings.slice(20, 40);
    },
    availableBoatsFiltered() {
      return this.availableBoats.filter(
        (boat) => !this.moorings.some((m) => m.boat && m.boat._id === boat._id)
      );
    },
  },
  methods: {
    showBoatDetails(mooring) {
      this.selectedMooring = mooring;
      this.selectedEmptyMooring = null;
    },
    showAddBoatForm(mooring) {
      this.selectedEmptyMooring = mooring;
      this.selectedMooring = null;
    },
    closePopup() {
      this.selectedMooring = null;
      this.selectedEmptyMooring = null;
    },
    async removeBoat(mooringId) {
      await fetch(
        `https://desolate-caverns-71958-8003a607a2e2.herokuapp.com/api/moorings${mooringId}/remove`,
        {
          method: "POST",
        }
      );
      this.moorings.find((m) => m._id === mooringId).boat = null;
      this.selectedMooring = null;
    },
    async addBoat(mooringId) {
      if (!this.selectedBoatId) return;
      await fetch(
        `https://desolate-caverns-71958-8003a607a2e2.herokuapp.com/api/moorings/${mooringId}/add`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ boatId: this.selectedBoatId }),
        }
      );
      this.moorings.find((m) => m._id === mooringId).boat =
        this.availableBoats.find((b) => b._id === this.selectedBoatId);
      this.selectedEmptyMooring = null;
    },
  },
  async created() {
    this.moorings = await (
      await fetch(
        "https://desolate-caverns-71958-8003a607a2e2.herokuapp.com/api/moorings/"
      )
    ).json();
    this.availableBoats = await (
      await fetch(
        "https://desolate-caverns-71958-8003a607a2e2.herokuapp.com/api/boats/all"
      )
    ).json();
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
.close-button {
  position: absolute;
  top: 8px;
  right: 10px;
  background: none;
  border: none;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  color: black;
}

.close-button:hover {
  color: red;
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
.remove-button {
  background-color: red;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  font-weight: bold;
}

.remove-button:hover {
  background-color: darkred;
}
.add-button {
  background-color: green;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  font-weight: bold;
}

.add-button:hover {
  background-color: darkgreen;
}

select {
  width: 100%;
  padding: 8px;
  margin-top: 10px;
  border-radius: 5px;
}
</style>
