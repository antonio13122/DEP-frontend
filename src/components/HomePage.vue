<template>
  <section id="HomePage" class="home">
    <div class="hero">
      <h2>We ensure the best Marina experience</h2>
      <p>
        Easily find, reserve, and manage docking spaces with DEP – the ultimate
        platform for sailors and marina visitors. Whether you're managing a
        marina or planning your next voyage, DEP simplifies your journey.
      </p>
      <div class="buttons">
        <router-link to="/Register" class="btn primary"
          >See how it works</router-link
        >
        <router-link to="/sailor" class="btn secondary"
          >Go to Sailor Home</router-link
        >
        <a href="#AppointmentForm" class="btn secondary"> Learn More </a>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "HomePage",
};
</script>

<style scoped>
.home {
  color: white;
  background-color: #060b27;
  padding: 3rem 4rem;
  font-family: "Montserrat", sans-serif;
  margin: 0;
  box-sizing: border-box;
  height: 100vh;
  display: flex;
  align-items: left;
  justify-content: left;
}

.hero {
  text-align: left;
  max-width: 800px;
}

.hero h2 {
  font-family: "Montserrat", sans-serif;
  font-size: 70px;
  font-weight: 800;
  margin-bottom: 1rem;
}

.hero p {
  font-family: "Montserrat", sans-serif;
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 2rem;
  max-width: 600px;
}

.buttons {
  display: flex;
  gap: 1rem;
  justify-content: flex-start;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: bold;
}

.primary {
  background-color: #008cff;
  color: white;
  font-family: "Montserrat", sans-serif;
  text-decoration: none;
}

.secondary {
  background: transparent;
  border: 2px solid white;
  color: white;
  font-family: "Montserrat", sans-serif;
  text-decoration: none;
}
</style>
