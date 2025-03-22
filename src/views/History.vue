<template>
  <div class="wrapper">
    <router-link to="/SailorHome">
      <img src="@/assets/back_icon.png" alt="Back Icon" class="back-icon" />
    </router-link>
    <h2 class="title">Docking History</h2>

    <div v-if="loading" class="loading-text">Loading...</div>

    <div v-else-if="history.length > 0" class="table">
      <div class="row header">
        <div class="cell">Date</div>
        <div class="cell">Mooring</div>
        <div class="cell">Boat Name</div>
        <div class="cell">Type</div>
        <div class="cell">Action</div>
      </div>
      <div v-for="entry in history" :key="entry._id" class="row">
        <div class="cell">{{ formatDate(entry.timestamp) }}</div>
        <div class="cell">
          {{ entry.mooring ? entry.mooring.number : "Unknown" }}
        </div>
        <div class="cell blue">
          {{ entry.boat ? entry.boat.ime_broda : "Unknown" }}
        </div>
        <div class="cell">
          {{ entry.boat ? entry.boat.vrsta_broda : "Unknown" }}
        </div>
        <div class="cell" :class="entry.action">{{ entry.action }}</div>
      </div>
    </div>

    <div v-else class="no-history">No history records found.</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      history: [],
      loading: true,
    };
  },
  async created() {
    await this.fetchHistory();
  },
  methods: {
    async fetchHistory() {
      try {
        const response = await fetch(
          "https://desolate-caverns-71958-8003a607a2e2.herokuapp.com/api/moorings/history/all"
        );
        this.history = await response.json();
      } catch (error) {
        console.error("Error fetching history:", error);
      } finally {
        this.loading = false;
      }
    },
    formatDate(timestamp) {
      return new Date(timestamp).toLocaleString();
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
  margin-top: 100px;
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
  padding-top: px;
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

.arrived {
  color: green;
}

.departured {
  color: red;
}

.no-history {
  font-size: 18px;
  color: red;
  margin-top: 20px;
}
</style>
