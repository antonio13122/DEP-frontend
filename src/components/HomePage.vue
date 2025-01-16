<template>
  <section id="home" class="home">
    <div class="hero">
      <h2>We ensure the best Marina experience</h2>
      <p>
        Easily find, reserve, and manage docking spaces with DEP – the ultimate
        platform for sailors and marina visitors. Whether you're managing a
        marina or planning your next voyage, DEP simplifies your journey.
      </p>
      <div class="buttons">
        <button class="btn primary">See how it works</button>
        <button class="btn secondary">Learn More</button>
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
  padding: 3rem 4rem; /* Add padding to push content away from the edges */
  font-family: "Montserrat", sans-serif;
  margin: 0; /* Ensure no extra margins */
  box-sizing: border-box; /* Include padding in width calculation */
}
.hero {
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Align content to the left */
  text-align: left; /* Left-align text */
}
.hero h2 {
  font-family: "Montserrat", sans-serif;
  font-size: 50px;
  font-weight: 800;
  margin-bottom: 1rem;
}
.hero p {
  font-family: "Montserrat", sans-serif;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 2rem;
  max-width: 600px; /* Limit the width for better readability */
  line-height: 1.9;
}
.buttons {
  display: flex;
  gap: 1rem;
  justify-content: flex-start; /* Align buttons to the left */
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
}
.secondary {
  background: transparent;
  border: 2px solid white;
  color: white;
}
</style>
