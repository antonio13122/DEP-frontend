<template>
  <section class="about-us">
    <div class="feature">
      <img src="@/assets/icon1.png" alt="Seamless Reservations" />
      <h3>Seamless Reservations</h3>
      <p>
        Say goodbye to hassle. Reserve your docking spot in just a few clicks.
      </p>
    </div>
    <div class="feature">
      <img src="@/assets/icon2.png" alt="Optimized Docking Management" />
      <h3>Optimized Docking Management</h3>
      <p>
        Marinas can streamline availability and track reservations effortlessly.
      </p>
    </div>
    <div class="feature">
      <img src="@/assets/icon3.png" alt="Reliable Support" />
      <h3>Reliable Support</h3>
      <p>
        Marinas can streamline availability and track reservations effortlessly.
      </p>
    </div>
  </section>
</template>

<style scoped>
.about-us {
  font-family: "Montserrat", sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  padding: 4rem;
  background-color: #060b27;
  color: white;
  text-align: center;
}

.feature {
  max-width: 300px;
}

.feature img {
  width: 80px;
  height: 80px;
  margin-bottom: 1rem;
}

.feature h3 {
  font-family: "Montserrat", sans-serif;
  font-size: 16;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.feature p {
  font-family: "Montserrat", sans-serif;
  font-size: 0.9rem;
  line-height: 1.5;
}
</style>
<script>
export default {
  name: "AboutUs",
};
</script>

<style></style>
