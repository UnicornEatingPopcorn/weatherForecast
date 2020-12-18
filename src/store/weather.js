import weatherApi from "@/service/WeatherApi";

export default {
  state: {
    todayWeather: {
      temp: 0,
      humidity: 0,
    },
    dates: [],
    view: false,
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
  },
  actions: {
    async getTodayWeather({ commit }, city) {
      await weatherApi
        .getWeatherByCity(city)
        .then((response) => {
          commit("SET_TODAY_WEATHER", response.data.main);
          commit("SET_DATES", Date(response.data.dt));
          commit("SET_VIEW", true);
        })
        .catch((error) => {
          console.log("There was an error", error.response);
        });
    },
  },
};
