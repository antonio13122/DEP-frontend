<template>
  <div>
    <h1>Test API Request</h1>
    <button @click="fetchUsers">Fetch Users</button>
    <div v-if="loading">Loading...</div>
    <div v-if="error" style="color: red">Error: {{ error }}</div>
    <ul v-if="users.length">
      <li v-for="user in users" :key="user._id">
        {{ user.name }} - {{ user.email }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios"; // Import axios directly

export default {
  data() {
    return {
      users: [], // Array to store users fetched from backend
      loading: false, // For loading state
      error: null, // To handle error messages
    };
  },
  methods: {
    // Function to fetch users from the API
    async fetchUsers() {
      this.loading = true;
      this.error = null; // Reset error

      try {
        const response = await axios.get("http://localhost:5000/api/users");
        this.users = response.data; // Store the users data
      } catch (err) {
        this.error = err.response
          ? err.response.data.message
          : "An error occurred";
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
h1 {
  color: #42b983;
}
button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  cursor: pointer;
}
button:hover {
  background-color: #357a61;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  background: #f4f4f4;
  margin: 5px 0;
  padding: 10px;
  border-radius: 5px;
}
</style>
