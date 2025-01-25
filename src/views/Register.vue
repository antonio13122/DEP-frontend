<template>
  <div>
    <h1>Register</h1>
    <form @submit.prevent="handleRegister">
      <input v-model="name" placeholder="Name" required />
      <input v-model="email" placeholder="Email" required />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        required
      />
      <button type="submit">Register</button>
    </form>
    <p v-if="error">{{ error }}</p>
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
        this.$router.push("/Login"); // Redirect to login after successful registration
      } catch (err) {
        console.error(err.response?.data);
        this.error = err.response?.data?.message || "Registration failed";
      }
    },
  },
};
</script>

<style></style>
