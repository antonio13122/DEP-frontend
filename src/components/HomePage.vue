<template>
  <section id="home" class="home">
    <div class="hero">
      <h2>We ensure the best Marina experience</h2>
      <p>
        Find the perfect marina for your next journey, equipped with advanced
        facilities and services tailored for sailors and sea enthusiasts.
      </p>
      <button class="btn">Explore</button>
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
  text-align: center;
  color: white;
  background-color: #0a192f;
  padding: 2rem 1rem;
}
.hero h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}
.hero p {
  font-size: 1rem;
  margin-bottom: 1.5rem;
}
.btn {
  background-color: #1b263b;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  cursor: pointer;
}
</style>
