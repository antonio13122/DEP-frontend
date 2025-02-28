<template>
  <div class="weather-container">
    <div class="current-weather">
      <h2>{{ city }}</h2>
      <div v-if="weather" class="weather-info">
        <img :src="weatherIcon" alt="Weather icon" class="weather-icon" />
        <span class="temperature">{{ weather.main.temp }}°C</span>
        <span class="wind">🌬️ {{ weather.wind.speed }} m/s</span>
        <span class="clouds">☁️ {{ weather.weather[0].description }}</span>
      </div>
      <p v-else>Loading...</p>
    </div>

    <div v-if="forecast.length" class="forecast">
      <h3>5-Day Forecast</h3>
      <div class="forecast-grid">
        <div v-for="day in forecast" :key="day.dt" class="forecast-item">
          <p>{{ formatDate(day.dt) }}</p>
          <img :src="getWeatherIcon(day.weather[0].icon)" alt="Weather icon" />
          <p>{{ day.main.temp }}°C</p>
        </div>
      </div>
    </div>
  </div>
  <div>
    <router-link to="/">
      <img
        class="anchor-icon"
        :src="require('@/assets/back_icon.png')"
        alt="Book Berth"
      />
    </router-link>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { getWeather, getForecast } from "@/services/weatherService";

export default {
  setup() {
    const city = ref("Supetarska Draga");
    const weather = ref(null);
    const forecast = ref([]);
    const lat = 44.7964531;
    const lon = 14.7255107;
    const weatherIcon = ref("");

    onMounted(async () => {
      try {
        weather.value = await getWeather(lat, lon);
        forecast.value = await getForecast(lat, lon);
        weatherIcon.value = getWeatherIcon(weather.value.weather[0].icon);
      } catch (error) {
        console.error(error);
      }
    });

    const formatDate = (timestamp) => {
      const options = { weekday: "short", day: "numeric", month: "short" };
      return new Date(timestamp * 1000).toLocaleDateString("en-US", options);
    };

    const getWeatherIcon = (iconCode) => {
      return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    };

    return { city, weather, forecast, weatherIcon, formatDate, getWeatherIcon };
  },
};
</script>

<style scoped>
.weather-container {
  max-width: 1600px;
  margin: 130px auto;
  padding: 110px;
  border-radius: 15px;
  background: linear-gradient(to bottom right, #060b27, #230cb6);
  color: white;
  text-align: center;
  font-family: Montserrat, sans-serif;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.current-weather h2 {
  font-family: Montserrat, sans-serif;

  font-size: 1.9em;
  margin-bottom: 50px;
}

.weather-info {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  font-size: 1.2em;
}

.weather-icon {
  width: 50px;
}
.anchor-icon {
  position: absolute;
  top: 20px;
  left: 20px;
  width: 50px;
  height: 50px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.temperature {
  font-size: 1.2em;
  font-weight: bold;
  font-family: Montserrat, sans-serif;
}

.wind,
.clouds {
  white-space: nowrap;
}

.forecast {
  margin-top: 20px;
}

.forecast-grid {
  display: flex;
  justify-content: space-around;
  gap: 10px;
  overflow-x: auto;
}

.forecast-item {
  flex: 1;
  text-align: center;
  background: rgba(255, 255, 255, 0.2);
  padding: 10px;
  border-radius: 10px;
}

.forecast-item img {
  width: 50px;
}

.forecast-item p {
  margin: 5px 0;
}
</style>
