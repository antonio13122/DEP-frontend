<template>
  <div id="main-view">
    <SiteHeader />
    <main>
      <HomePage />
      <AboutUs />
      <Marinas />
    </main>
    <SiteFooter />
  </div>
</template>

<script>
import HomePage from "@/components/HomePage.vue";
import AboutUs from "@/components/AboutUs.vue";
import Marinas from "@/components/Marinas.vue";

import SiteHeader from "@/components/SiteHeader.vue";
import SiteFooter from "@/components/SiteFooter.vue";

export default {
  name: "MainView",
  components: {
    HomePage,
    AboutUs,
    Marinas,

    SiteHeader,
    SiteFooter,
  },
};
</script>

<style scoped>
body {
  margin: 0;
  font-family: "Arial", sans-serif;
  background-color: #060b27;
  color: #060b27;
  overflow-x: hidden;
  padding-left: 1cm;
  padding-right: 1cm;
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

main > * {
  width: 100%;
}

#main-view {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
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
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    max-width: 1200px;
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    margin: 0 auto;
  }

  section {
    width: 100%;
  }
}
</style>
