<template>
  <div class="product-page">
    <router-link to="/MainView">
      <img src="@/assets/homeicon.png" alt="Back Icon" class="back-icon" />
    </router-link>

    <div class="product-container">
      <router-link to="/ListBoat">
        <img
          class="product-image"
          :src="require('@/assets/list_icon.png')"
          alt="List View"
        />
        <h1>All boats</h1>
      </router-link>
    </div>

    <div class="product-container">
      <router-link to="/DockView">
        <img
          class="product-image"
          :src="require('@/assets/arr_icon.png')"
          alt="Dockview"
        />
        <h1>Occupancy</h1>
      </router-link>
    </div>

    <div class="product-container">
      <router-link to="/History">
        <img
          class="product-image"
          :src="require('@/assets/his.png')"
          alt="History"
        />
        <h1>History</h1>
      </router-link>
    </div>

    <div class="product-container">
      <router-link to="/SailorHome2">
        <img
          class="product-image"
          :src="require('@/assets/arr.png')"
          alt="Arrivals"
        />
        <h1>Arrivals</h1>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  setup() {},
  name: "SailorHome",
};
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  position: relative;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom right,
    #274b74 0%,
    #8233c5 50%,
    #e963fd 100%
  );
  font-family: "Montserrat", sans-serif;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
}

.product-page {
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  gap: 5rem;
  align-items: center;
  margin-top: 300px;
}

.product-container {
  width: 200px;
  cursor: pointer;
  transition: transform 0.3s ease;
  text-align: center;
  text-decoration: none;
}

.back-icon {
  position: absolute;
  top: 10px;
  left: 20px;
  width: 30px;
  height: 30px;
  cursor: pointer;
}

.product-container:hover {
  transform: scale(1.2);
}

.product-image {
  width: 80%;
  height: auto;
  display: block;
}

.router-link,
.router-link a {
  text-decoration: none;
}

h1 {
  margin-top: 40px;
  font-size: 1.4rem;
  font-family: "Montserrat", sans-serif;
  color: white;
  font-weight: 400;
  text-decoration: none;
}
</style>
