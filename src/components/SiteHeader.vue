<template>
  <header class="header">
    <nav class="navbar">
      <img :src="require('@/assets/DEP.png')" alt="Logo" class="logo" />
      <ul class="nav-links">
        <li><a href="#HomePage">Home</a></li>
        <li><a href="#AboutUs">About Us</a></li>
        <li><a href="#Marinas">Our Marinas</a></li>
        <li><router-link to="/AppointmentForm">Contact</router-link></li>
        <li><router-link to="/WeatherAPI">Weather</router-link></li>
      </ul>
      <div class="buttons">
        <router-link to="/Choose" class="member-button">Join us →</router-link>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: "SiteHeader",
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap");

.header {
  background-color: #060b27;
  color: white;
  padding: 0.8rem;
  font-family: "Montserrat", sans-serif;
  border-top: 3px solid #23a3f0;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  width: 120px;
  height: auto;
}

.nav-links {
  list-style: none;
  display: flex;
  letter-spacing: 0.1em;
  gap: 4rem;
  font-weight: 500;
}

.nav-links a {
  color: white;
  text-decoration: none;
  cursor: pointer;
  font-size: 14px;
}

.buttons {
  display: flex;
  gap: 0rem;
  align-items: center;
}

.member-button:hover {
  background-color: #1a7ec8;
}

.member-button {
  background-color: #23a3f0;
  color: white;
  padding: 0.8rem 3.5rem;
  border: none;
  margin-right: 30px;
  margin-left: 5px;
  border-radius: 5px;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  font-size: 14px;
  letter-spacing: 0.1em;
  cursor: pointer;
  text-decoration: none;
}
</style>
