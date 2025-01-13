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
//import HelloWorld from "./components/HelloWorld.vue";
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
