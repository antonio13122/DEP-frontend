<template>
  <header class="header">
    <nav class="navbar">
      <img :src="require('@/assets/DEP.png')" alt="Logo" class="logo" />
      <ul class="nav-links">
        <li><a href="#HomePage">Home</a></li>
        <li><a href="#AboutUs">About Us</a></li>
        <li><a href="#Marinas">Our Marinas</a></li>
        <li><a href="#AppointmentForm">Contact</a></li>
      </ul>
      <button>Login →</button>
      <button class="btn">Become a member →</button>
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
  padding: 1rem;
  font-family: "Montserrat", sans-serif;
}
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: "Montserrat", sans-serif;
}
.logo {
  width: 150px;
  height: auto;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 1rem;
  font-family: "Montserrat", sans-serif;
}
.nav-links a {
  color: white;
  text-decoration: none;
  font-family: "Montserrat", sans-serif;
  cursor: pointer; /* Ensures it's clickable */
}

.btn {
  background-color: #23a3f0;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  cursor: pointer;
  font-family: "Montserrat", sans-serif;
}
</style>
