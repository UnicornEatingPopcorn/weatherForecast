import { defineStore } from 'pinia'
import weatherApi from "@/service/WeatherApi";

export const useCounterStore = defineStore("counter", {
  state: () => ({
    todayWeather: {
      temp: 0,
      humidity: 0,
    },
    date: "",
    isView: false,
    coordinates: {
      lon: 0,
      lat: 0,
    },
    weatherForecast: [],
  }),
  getters: {
    todayWeatherData: (state) => state.todayWeather, // Renamed getter
    formattedDate: (state) => state.date, // Renamed getter
    viewStatus: (state) => state.isView, // Renamed getter
    coordinatesData: (state) => state.coordinates, // Renamed getter
    weatherForecastData: (state) => state.weatherForecast, // Renamed getter
  },
  actions: {
    updateTodayWeather(todayWeather) {
      this.todayWeather.temp = todayWeather.temp;
      this.todayWeather.humidity = todayWeather.humidity;
    },
    updateDate(date) {
      this.date = new Date(date).toLocaleDateString();
    },
    updateIsView(isView) {
      this.isView = isView;
    },
    updateCoordinates(coordinates) {
      this.coordinates.lon = coordinates.lon;
      this.coordinates.lat = coordinates.lat;
    },
    updateWeatherForecast(weatherForecast) {
      const today = new Date().toLocaleDateString();
      const firstDate = weatherForecast.findIndex(
        (day) => today === new Date(day.dt * 1000).toLocaleDateString()
      );
      if (firstDate > 0) {
        this.weatherForecast = weatherForecast.slice(firstDate, 5);
      } else {
        this.weatherForecast = weatherForecast.slice(0, 5);
      }
    },
    async getTodayWeather(city) {
      try {
        const response = await weatherApi.getWeatherByCity(city);
        this.updateTodayWeather(response.data.main);
        this.updateDate(Date(response.data.dt));
        this.updateIsView(true);
        this.updateCoordinates(response.data.coord);
      } catch (error) {
        this.updateIsView(false);
        return Promise.reject(error);
      }
    },
    async getNextDaysWeather(coordinates) {
      try {
        const response = await weatherApi.getWeatherByCoordinates(coordinates);
        this.updateWeatherForecast(response.data.daily);
        this.updateIsView(true);
      } catch (error) {
        this.updateIsView(false);
        return Promise.reject(error);
      }
    },
  },
});
