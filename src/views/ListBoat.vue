<template>
  <div class="wrapper">
    <router-link to="/SailorHome">
      <img src="@/assets/back_icon.png" alt="Back Icon" class="back-icon" />
    </router-link>
    <h2 class="title">All Boats</h2>

    <div v-if="loading" class="loading-text">Loading...</div>

    <div v-else-if="boats.length > 0" class="table">
      <div class="row header">
        <div class="cell">Boat Name</div>
        <div class="cell">Boat Number</div>
        <div class="cell">Length (m)</div>
        <div class="cell">Draft (m)</div>
        <div class="cell">Type</div>
        <div class="cell">Owner</div>
      </div>
      <div v-for="boat in boats" :key="boat._id" class="row">
        <div class="cell blue">{{ boat.ime_broda }}</div>
        <div class="cell">{{ boat.broj_broda }}</div>
        <div class="cell">{{ boat.duzina }}</div>
        <div class="cell">{{ boat.gaz }}</div>
        <div class="cell">{{ boat.vrsta_broda }}</div>
        <div class="cell">{{ boat.user?.name || "Unknown" }}</div>
      </div>
    </div>

    <div v-else class="no-boats">No boats found.</div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ListBoat",
  data() {
    return {
      boats: [],
      loading: true,
    };
  },
  async created() {
    await this.fetchAllBoats();
  },
  methods: {
    async fetchAllBoats() {
      try {
        const response = await axios.get(
          "https://desolate-caverns-71958-8003a607a2e2.herokuapp.com/api/boats/all"
        );
        this.boats = response.data;
      } catch (error) {
        console.error("Error fetching boats:", error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
body {
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  color: #3b3b3b;
  background: #2b2b2b;
}

.wrapper {
  margin: 0 auto;
  padding: 10px;
  width: 100%;
  max-width: 1200px;
  position: relative;
}

.back-icon {
  position: absolute;
  top: 10px;
  left: -150px;
  width: 60px;
  height: 60px;
  cursor: pointer;
}

.title {
  font-size: 36px;
  font-family: "Montserrat", sans-serif;
  font-weight: bold;
  margin-bottom: 70px;
  margin-top: 120px;
  color: white;
}

.loading-text {
  font-size: 18px;
  font-family: "Montserrat", sans-serif;
  color: gray;
}

.table {
  margin: 0 0 40px 0;
  width: 100%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  display: table;
}

.row {
  display: table-row;
  background: #f6f6f6;
}

.row:nth-of-type(odd) {
  background: #e9e9e9;
}

.row.header {
  font-weight: 900;
  color: #ffffff;
  background: #330e90;
}

.cell {
  padding: 6px 12px;
  display: table-cell;
  color: #616767;
  font-family: "Montserrat", sans-serif;
}

.row.header .cell {
  color: #ffffff;
}

.cell.blue {
  color: #606060;
  font-weight: bold;
}

.cell:first-child {
  font-weight: bold;
}

@media screen and (max-width: 580px) {
  .table {
    display: block;
  }

  .row {
    display: block;
    padding: 14px 0 7px;
  }

  .row.header {
    padding: 0;
    height: 6px;
  }

  .cell {
    margin-bottom: 10px;
  }

  .cell:before {
    margin-bottom: 3px;
    content: attr(data-title);
    min-width: 98px;
    font-size: 10px;
    line-height: 10px;
    font-weight: bold;
    text-transform: uppercase;
    color: #969696;
    display: block;
  }
}

/* Empty Boats Message */
.no-boats {
  font-size: 18px;
  color: red;
  margin-top: 20px;
}
</style>
