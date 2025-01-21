<template>
  <section id="AppointmentForm" class="appointment">
    <router-link to="/" class="home-link">
      <img
        :src="require('@/assets/homeicon.png')"
        alt="Home"
        class="home-icon"
      />
    </router-link>
    <h2>Make an Appointment</h2>

    <div class="iframe-container">
      <iframe
        src="https://docs.google.com/forms/d/e/1FAIpQLSda5sqyfKthQ9s0Akj93xiSkjUquy0YTDHUV-Px7pkcLGhflg/viewform?embedded=true"
        width="100%"
        height="1632"
        frameborder="0"
        marginheight="0"
        marginwidth="0"
      >
        Loading…
      </iframe>
    </div>
  </section>
</template>

<script>
export default {
  name: "AppointmentForm",
};
</script>

<style scoped>
.appointment {
  padding: 2rem;
  background-color: #060b27;
  text-align: center;
  font-family: "Arial", sans-serif;
  color: #333;
}

h2 {
  font-size: 2rem;
  color: #ffffff;
  margin-bottom: 1rem;
}

.iframe-container {
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  padding: 1rem;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

iframe {
  width: 100%;
  max-width: 700px;
  height: 1500px;
  border: none;
  border-radius: 8px;
}

.home-link {
  position: absolute;
  top: 10px;
  left: 10px;
  display: inline-block;
}

.home-icon {
  width: 30px;
  height: 30px;
}

@media (max-width: 768px) {
  .appointment {
    padding: 1rem;
  }

  iframe {
    height: 1200px;
  }
}

@media (max-width: 480px) {
  iframe {
    height: 1000px;
  }
}
</style>
