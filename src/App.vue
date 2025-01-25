<template>
  <router-view></router-view>
</template>

<script>
import { getUser } from "@/services/authService";

export default {
  name: "App",
  data() {
    return {
      user: getUser(),
    };
  },
  methods: {
    setUser(user) {
      this.user = user;
    },
  },
  provide() {
    return {
      user: this.user,
      setUser: this.setUser,
    };
  },
};
</script>

<style>
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
  background-color: #060b27;
  color: white;
  overflow-x: hidden;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #060b27;
}

main {
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

section {
  width: 100%;
  max-width: 100%;
  margin: 0;
}

.HomePage,
.MarinasSection,
.AppointmentForm,
.SiteFooter,
.SiteHeader {
  width: 100%;
  box-sizing: border-box;
}
</style>
