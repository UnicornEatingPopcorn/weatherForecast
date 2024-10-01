import weatherApi from "@/service/WeatherApi";
import { createStore } from "vuex";

const store = createStore({
  state: {
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
  },
  mutations: {
    SET_TODAY_WEATHER(state, todayWeather) {
      state.todayWeather.temp = todayWeather.temp;
      state.todayWeather.humidity = todayWeather.humidity;
    },
    SET_DATE(state, date) {
      state.date = new Date(date).toLocaleDateString();
    },
    SET_IS_VIEW(state, isView) {
      state.isView = isView;
    },
    SET_COORDINATES(state, coordinates) {
      state.coordinates.lon = coordinates.lon;
      state.coordinates.lat = coordinates.lat;
    },
    SET_WEATHER_FORECAST(state, weatherForecast) {
      const dailyForecasts = {};
      const today = new Date().toLocaleDateString();

      weatherForecast.forEach(day => {
        const datePart = new Date(day.dt * 1000).toLocaleDateString();

        if (!dailyForecasts[datePart]) {
          dailyForecasts[datePart] = day;
        }
      });

      const uniqueDailyForecasts = Object.values(dailyForecasts);

      const firstDateIndex = uniqueDailyForecasts.findIndex(
        (day) => today === new Date(day.dt * 1000).toLocaleDateString()
      );

      if (firstDateIndex >= 0) {
        state.weatherForecast = uniqueDailyForecasts.slice(firstDateIndex + 1, firstDateIndex + 6);
      } else {
        state.weatherForecast = uniqueDailyForecasts.slice(0, 5);
      }
    },
  },
  getters: {
    todayWeather(state) {
      return state.todayWeather;
    },
    date(state) {
      return state.date;
    },
    isView(state) {
      return state.isView;
    },
    coordinates(state) {
      return state.coordinates;
    },
    weatherForecast(state) {
      return state.weatherForecast;
    },
  },
  actions: {
    async getTodayWeather({ commit }, city) {
      try {
        const response = await weatherApi.getWeatherByCity(city);
        commit("SET_TODAY_WEATHER", response.data.main);
        commit("SET_DATE", Date(response.data.dt));
        commit("SET_IS_VIEW", true);
        commit("SET_COORDINATES", response.data.coord);
      } catch (error) {
        commit("SET_IS_VIEW", false);
        return Promise.reject(error);
      }
    },

    async getNextDaysWeather({ commit }, coordinates) {
      try {
        const response = await weatherApi.getWeatherByCoordinates(coordinates);
        commit("SET_WEATHER_FORECAST", response.data.list);
        commit("SET_IS_VIEW", true);
      } catch (error) {
        commit("SET_IS_VIEW", false);
        return Promise.reject(error);
      }
    },
  },
});

export default store;
