<template>
  <div id="app">
    <SiteHeader />

    <main>
      <HomePage />
      <MarinasSection />
      <AppointmentForm />
    </main>

    <SiteFooter />
  </div>
</template>

<script>
import HomePage from "./components/HomePage.vue";
import MarinasSection from "./components/MarinasSection.vue";
import AppointmentForm from "./components/AppointmentForm.vue";
import SiteFooter from "./components/SiteFooter.vue";
import SiteHeader from "./components/SiteHeader.vue";

export default {
  name: "App",
  components: {
    HomePage,
    MarinasSection,
    AppointmentForm,
    SiteFooter,
    SiteHeader,
  },
};
</script>

<style>
body {
  margin: 0;
  font-family: "Arial", sans-serif;
  background-color: #060b27;
  color: white;
  overflow-x: hidden;
}

#app {
  width: 100%;
  display: flex;
  flex-direction: column;
}

main {
  scroll-behavior: smooth;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
}

section {
  width: 100%;
  max-width: 100%;
  margin: 20px 0;
}

.HomePage,
.MarinasSection,
.AppointmentForm,
.SiteFooter,
.SiteHeader {
  width: 100%;
  box-sizing: border-box;
}

@media (max-width: 768px) {
  main {
    padding: 10px;
  }

  section {
    width: 100%;
  }
}
</style>
