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
      ></div>
    </div>

    <div class="dock"></div>

    <div class="info-text">
      <p>
        Become our
        <router-link to="/" class="member-link">member</router-link>
      </p>
      <p>to book the berth.</p>
    </div>

    <div class="mooring-grid">
      <div
        v-for="mooring in rightMoorings"
        :key="mooring._id"
        :class="['mooring', mooring.boat ? 'occupied' : 'available']"
      ></div>
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
      await fetch(
        "https://desolate-caverns-71958-8003a607a2e2.herokuapp.com/api/moorings"
      )
    ).json();
  },
};
</script>

<style scoped>
.mooring-container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 120vh;
  background-image: url("@/assets/guestbg.png");
  background-size: cover;
  background-position: center;
  padding: 40px;

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
  height: 110%;
  border: 2px solid white;
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
  background-color: #1a4e23;
  border-color: white;
}

.occupied {
  background-color: white;
}

.back-icon {
  position: absolute;
  top: 700px;
  right: 0;
  width: 60px;
  height: 60px;
  margin-left: 10px;
  padding: 10px;
  cursor: pointer;
}

.info-text {
  position: absolute;
  font-family: "Montserrat", sans-serif;
  font-size: 68px;
  font-weight: bold;
  color: white;
  top: 25%;
  left: 640px;
  text-align: center;
  line-height: 0.33;
  white-space: nowrap;
}

.member-link {
  color: #007bff;
  text-decoration: none;
  transition: color 0.3s ease-in-out;
}

.member-link:hover {
  color: white;
}
</style>
