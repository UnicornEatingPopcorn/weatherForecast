import weatherApi from "@/service/WeatherApi";

export default {
  state: {
    todayWeather: {
      temp: 0,
      humidity: 0,
    },
    date: "",
    view: false,
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
    SET_VIEW(state, view) {
      state.view = view;
    },
    SET_COORDINATES(state, coordinates) {
      state.coordinates.lon = coordinates.lon;
      state.coordinates.lat = coordinates.lat;
    },
    SET_WEATHER_FORECAST(state, weatherForecast) {
      const today = new Date().toLocaleDateString();
      const firstDate = weatherForecast.findIndex(
        (day) => today === new Date(day.dt * 1000).toLocaleDateString()
      );
      if (firstDate > 0) {
        state.weatherForecast = weatherForecast.slice(firstDate, 6);
      } else {
        state.weatherForecast = weatherForecast.slice(0, 6);
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
    view(state) {
      return state.view;
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
      await weatherApi
        .getWeatherByCity(city)
        .then((response) => {
          commit("SET_TODAY_WEATHER", response.data.main);
          commit("SET_DATE", Date(response.data.dt));
          commit("SET_VIEW", true);
          commit("SET_COORDINATES", response.data.coord);
        })
        .catch((error) => {
          console.log("There was an error", error.response);
          alert("Такого города нет, попробуйте еще раз");
          commit("SET_VIEW", false);
        });
    },
    async getNextDaysWeather({ commit }, coordinates) {
      await weatherApi
        .getWeatherByCoordinates(coordinates)
        .then((response) => {
          commit("SET_WEATHER_FORECAST", response.data.daily);
          commit("SET_VIEW", true);
        })
        .catch((error) => {
          console.log("There was an error", error.response);
        });
    },
  },
};
