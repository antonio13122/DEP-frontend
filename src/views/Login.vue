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

        console.log("Login successful");

        // is sailor flag
        localStorage.setItem("isSailor", data.user.isSailor);

        this.$root.setUser(data.user);
        this.$router.push(data.user.isSailor ? "/SailorHome" : "/OwnerHome");
      } catch (err) {
        this.error = err.response?.data?.message || "Invalid email or password";
      }
    },
  },
};
</script>
