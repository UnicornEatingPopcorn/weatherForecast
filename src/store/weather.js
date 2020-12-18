import weatherApi from "@/service/WeatherApi";

export default {
  state: {
    todayWeather: {
      temp: 0,
      humidity: 0,
    },
    dates: [],
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
    SET_DATES(state, date) {
      state.dates.push(new Date(date).toLocaleDateString());
    },
    SET_VIEW(state, view) {
      state.view = view;
    },
    SET_COORDINATES(state, coordinates) {
      state.coordinates.lon = coordinates.lon;
      state.coordinates.lat = coordinates.lat;
    },
    SET_WEATHER_FORECAST(state, weatherForecast) {
      state.weatherForecast = weatherForecast;
    },
  },
  getters: {
    todayWeather(state) {
      return state.todayWeather;
    },
    dates(state) {
      return state.dates;
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
          commit("SET_DATES", Date(response.data.dt));
          commit("SET_VIEW", true);
          commit("SET_COORDINATES", response.data.coord);
        })
        .catch((error) => {
          console.log("There was an error", error.response);
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
