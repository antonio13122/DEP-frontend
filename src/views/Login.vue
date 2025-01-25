<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <input v-model="email" placeholder="Email" required />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
    </form>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import { login } from "@/services/authService";

export default {
  data() {
    return {
      email: "",
      password: "",
      error: "",
    };
  },
  methods: {
    async handleLogin() {
      try {
        const { data } = await login({
          email: this.email,
          password: this.password,
        });
        console.log("Login successful, navigating to /OwnerHome");
        this.$root.setUser(data.user);
        this.$router.push("/OwnerHome");
      } catch (err) {
        // Check for error message and set error if it exists
        this.error = err.response?.data?.message || "Invalid email or password";
      }
    },
  },
};
</script>
