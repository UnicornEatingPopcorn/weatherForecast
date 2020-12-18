import axios from "axios";

const apiClient = axios.create({
  baseURL: `http://api.openweathermap.org/`,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  getWeatherByCity(city) {
    return apiClient.get(
      `data/2.5/weather?q=${city}&appid=${process.env.VUE_APP_ID}&lang=ru&units=metric`
    );
  },
  getWeatherByCoordinates(coordinates) {
    return apiClient.get(
      `data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${process.env.VUE_APP_ID}&lang=ru&units=metric`
    );
  },
};
