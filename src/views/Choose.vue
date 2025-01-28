<template>
  <div class="choose-container">
    <div class="choose-box">
      <h2 class="choose-title">Login to your account</h2>
      <div class="roles">
        <div class="role" @click="goToLogin">
          <img src="@/assets/sailor-icon.png" alt="Sailor" />
          <p>Sailor</p>
        </div>
        <div class="role" @click="goToLogin">
          <img src="@/assets/boat-icon.png" alt="Boat Owner" />
          <p>Boat Owner</p>
        </div>
      </div>
      <p class="signup-text">
        Don't Have An Account?
        <router-link to="/register" class="signup-link">Sign Up</router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goToLogin() {
      this.$router.push("/login");
    },
  },
};
</script>

<style>
.choose-container {
  font-family: "Montserrat", sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to bottom right, #0b0f23, #0d1b3d);
}

.choose-box {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: none;
  width: 400px;
  text-align: center;
}

.choose-title {
  font-size: 20px;
  font-weight: bold;
  color: #0b0f23;
  margin-bottom: 20px;
}

.roles {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.role {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
}

.role:hover {
  transform: scale(1.1);
}

.role img {
  width: 70px;
  height: 70px;
}

.role p {
  font-size: 14px;
  margin-top: 8px;
  color: #0b0f23;

  font-weight: bold;
}

.signup-text {
  font-size: 14px;
  color: #555;
}

.signup-link {
  color: #0b0f23;
  font-weight: bold;
  text-decoration: none;
}

.signup-link:hover {
  text-decoration: underline;
}
</style>
