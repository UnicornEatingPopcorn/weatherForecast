import axios from "axios";

const apiClient = axios.create({
  baseURL: `http://api.openweathermap.org/`,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

const my_env_var = import.meta.env.VITE_APP_ID

export default {
  getWeatherByCity(city) {
    return apiClient.get(
      `data/2.5/weather?q=${city}&appid=${my_env_var}&units=metric`
    );
  },
  getWeatherByCoordinates(coordinates) {
    return apiClient.get(
      `data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${my_env_var}&units=metric`
    );
  },
};
