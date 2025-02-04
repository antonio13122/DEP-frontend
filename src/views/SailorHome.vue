<template>
  <div class="product-page">
    <div class="product-container">
      <router-link to="/ListBoat">
        <img
          class="product-image"
          :src="require('@/assets/list_icon.png')"
          alt="List View"
        />
        <h1>Occupancy</h1>
      </router-link>
    </div>
    <div class="product-container">
      <router-link to="/DockView">
        <img
          class="product-image"
          :src="require('@/assets/arr_icon.png')"
          alt="Dockview"
        />
        <h1>Boat list</h1>
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
  width: 100vw;
  height: 100vh;
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
  justify-content: center;
  gap: 20rem;
  align-items: center;
  margin-top: 200px;
  text-decoration: none;
}

.product-container {
  width: 300px;
  cursor: pointer;
  transition: transform 0.3s ease;
  text-align: center;
  text-decoration: none;
}

.product-container:hover {
  transform: scale(1.2);
}

.product-image {
  width: 100%;
  height: auto;
  display: block;
}

.router-link,
.router-link a {
  text-decoration: none;
}

h1 {
  margin-top: 60px;
  font-size: 1.7rem;
  font-family: "Montserrat", sans-serif;
  color: white;
  font-weight: 400;
  text-decoration: none;
}
</style>
