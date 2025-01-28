<template>
  <div class="login-container">
    <div class="login-box">
      <h2 class="login-title">Login to your account</h2>
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="input-group">
          <label>Email</label>
          <input
            v-model="email"
            type="email"
            placeholder="Enter your email"
            required
          />
        </div>
        <div class="input-group">
          <label>Password</label>
          <div class="password-container">
            <input
              v-model="password"
              type="password"
              placeholder="Enter your password"
              required
            />
          </div>
        </div>
        <button type="submit" class="login-button">Login now</button>
      </form>
      <p v-if="error" class="error-message">{{ error }}</p>
      <p class="signup-text">
        Don't have an account?
        <router-link to="/Register" class="signup-link">Sign Up</router-link>
      </p>
    </div>
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

<style>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to bottom right, #0b0f23, #0d1b3d);
}

.login-box {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.2);
  width: 450px;
  height: 350px;
  text-align: center;
}

.login-title {
  font-size: 28px;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  color: #0b0f23;
  margin-bottom: 20px;
}

.input-group {
  font-family: "Montserrat", sans-serif;
  text-align: left;
  margin-bottom: 15px;
}

.input-group label {
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  color: #555;
  display: block;
  margin-bottom: 5px;
}

.input-group input {
  font-family: "Montserrat", sans-serif;
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  width: calc(100% - 25px);
}

.password-container {
  position: relative;
}

.password-container input {
  width: calc(100% - 25px);
}

.toggle-password {
  font-family: "Montserrat", sans-serif;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 16px;
  color: #888;
}

.login-button {
  font-family: "Montserrat", sans-serif;
  width: 100%;
  padding: 18px;
  background: #0b0f23;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 10px;
  transition: background 0.3s ease;
}

.login-button:hover {
  background: #002db3;
}

.error-message {
  font-family: "Montserrat", sans-serif;
  color: red;
  font-size: 14px;
  margin-top: 10px;
}

.signup-text {
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  margin-top: 15px;
  color: #555;
}

.signup-link {
  font-family: "Montserrat", sans-serif;
  color: #003cff;
  font-weight: bold;
  text-decoration: none;
}

.signup-link:hover {
  text-decoration: underline;
}
</style>
