<template>
  <div class="container">
    <div class="register-box">
      <h1 class="logo">DEP<span class="dot">.</span></h1>
      <p class="subtitle">Welcome to the official site of our marina</p>
      <p class="login-text">
        Already have an account?
        <router-link to="/Choose" class="login-link">Login.</router-link>
      </p>

      <form @submit.prevent="handleRegister" class="register-form">
        <input
          v-model="name"
          type="text"
          placeholder="Name"
          required
          class="input-box"
        />
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          required
          class="input-box"
        />
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          required
          class="input-box"
        />
        <button type="submit" class="btn register-btn">Register</button>
      </form>

      <div class="divider"><span></span> Or <span></span></div>

      <router-link to="/MainView" class="btn guest-btn">
        Continue as a guest
      </router-link>
    </div>
    <div class="image-container"></div>
  </div>
</template>

<script>
import { register } from "@/services/authService.js";

export default {
  name: "Register",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      error: "",
    };
  },
  methods: {
    async handleRegister() {
      try {
        await register({
          name: this.name,
          email: this.email,
          password: this.password,
        });
        this.$router.push("/Choose");
      } catch (err) {
        console.error(err.response?.data);
        this.error = err.response?.data?.message || "Registration failed";
      }
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400&family=Poppins:ital,wght@1,700&display=swap");

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
  background-color: #0a0e26;
}

.register-box {
  width: 100%;
  max-width: 400px;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  color: white;
  text-align: center;
}

.logo {
  font-family: "Poppins", sans-serif;
  font-style: italic;
  font-weight: 700;
  font-size: 96px;
  letter-spacing: 10px;
  margin-top: 0.2rem;
  margin-bottom: 0rem;
}

.dot {
  color: #267eff;
}

.subtitle {
  font-family: "Montserrat", sans-serif;
  font-size: 18px;
  margin-top: 0rem;
  margin-bottom: 3rem;
}

.login-text {
  font-family: "Montserrat", sans-serif;
  font-size: 16px;
  margin: 1rem 0;
}

.login-link {
  color: #267eff;
  text-decoration: none;
}

.register-form {
  font-family: "Montserrat", sans-serif;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.input-box {
  font-family: "Montserrat", sans-serif;
  width: 100%;
  padding: 18px;
  border-radius: 10px;
  font-size: 1rem;
  border: 1px solid white;
  background-color: transparent;
  color: white;
  text-align: left;
  font-weight: 400;
}

.input-box::placeholder {
  font-family: "Montserrat", sans-serif;
  color: rgba(255, 255, 255, 0.7);
  text-align: left;
}
.register-btn {
  font-family: "Montserrat", sans-serif;
  width: 112%;
  padding: 13px;
  border-radius: 30px;
  font-size: 1rem;

  border: 1px solid white;
  background-color: #cccccc;
  color: #0e00a1;
  text-align: center;
  cursor: pointer;
  font-weight: 500;
}

.guest-btn {
  font-family: "Montserrat", sans-serif;
  width: 100%;
  padding: 18px;
  border-radius: 10px;
  font-size: 1rem;
  border: 1px solid white;
  background-color: transparent;
  color: white;
  text-align: center;
  cursor: pointer;
  font-weight: 400;
  text-decoration: none;
}

.divider {
  font-family: "Montserrat", sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  opacity: 0.7;
  margin: 1rem 0;
}

.divider span {
  display: block;
  height: 1px;
  width: 40px;
  background: rgba(255, 255, 255, 0.5);
}
</style>
