import axios from "axios";

const API_KEY = "5b1754515a608029bb99245d1dc8a659";
const BASE_URL = "https://api.openweathermap.org/data/2.5";
export async function getWeather(lat, lon) {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: { lat, lon, appid: API_KEY, units: "metric" },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching weather data:",
      error.response?.data || error.message
    );
    return null;
  }
}

export async function getForecast(lat, lon) {
  try {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: { lat, lon, appid: API_KEY, units: "metric" },
    });

    return response.data.list.filter((_, index) => index % 8 === 0); // Get one data point per day
  } catch (error) {
    console.error(
      "Error fetching forecast:",
      error.response?.data || error.message
    );
    return [];
  }
}
