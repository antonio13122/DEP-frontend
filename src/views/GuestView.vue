<template>
  <div class="mooring-container">
    <router-link to="/MainView">
      <img src="@/assets/back_icon.png" alt="Back Icon" class="back-icon" />
    </router-link>

    <div class="mooring-grid">
      <div
        v-for="mooring in leftMoorings"
        :key="mooring._id"
        :class="['mooring', mooring.boat ? 'occupied' : 'available']"
      >
        <span v-if="mooring.boat" class="boat-name">{{
          mooring.boat.ime_broda
        }}</span>
      </div>
    </div>

    <div class="dock"></div>

    <div class="info-text">
      <p>
        Become our
        <router-link to="/" class="member-link">member</router-link>
      </p>
      <p>to book the berth.</p>
      <img
        src="@/assets/login_page.png"
        alt="Mooring Image"
        class="info-image"
      />
    </div>

    <div class="mooring-grid">
      <div
        v-for="mooring in rightMoorings"
        :key="mooring._id"
        :class="['mooring', mooring.boat ? 'occupied' : 'available']"
      >
        <span v-if="mooring.boat" class="boat-name">{{
          mooring.boat.ime_broda
        }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      moorings: [],
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
  async created() {
    this.moorings = await (
      await fetch("http://localhost:5000/api/moorings")
    ).json();
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

.info-text {
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

.member-link {
  color: white;
  text-decoration: none;
  transition: color 0.3s ease-in-out;
}

.member-link:hover {
  color: #007bff;
}
.info-image {
  width: 830px;
  height: auto;
  margin-top: -40px;
  border-radius: 8px;
}
</style>
