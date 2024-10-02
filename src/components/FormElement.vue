<script setup lang="js">
defineProps({
  coordinates: {
    type: Object,
    required: true,
    default: () => ({ lon: 0, lat: 0}),
  },
  todayWeather: {
    type: Object,
    required: true,
    default: () => ({ temp: 0, humidity: 0}),
  },
  date: {
    type: String,
    required: true,
  },
  isView: {
    type: Boolean,
    required: true,
  },
  weatherForecast: {
    type: Array,
    required: true,
  },
})

const titles = ["Tempreture", "Humidity"];
const afterTitles = ["°С", "%"];
</script>

<template>
  <div class="form-block">
    <div class="form-element" v-if="isView">
      <p class="form-element__date">{{ date }}</p>
      <div class="form-element__titles">
        <div v-for="title in titles" v-bind:key="title.id" class="form-element__title">
          <h5>{{ title }}</h5>
        </div>
      </div>
      <div class="form-element__datas">
        <div v-for="today in todayWeather" v-bind:key="today.id" class="form-element__data">
          <h5>{{ today }}</h5>
        </div>
      </div>
      <div class="form-element__metrics">
        <div v-for="afterTitle in afterTitles" v-bind:key="afterTitle.id" class="form-element__metric">
          <h5>{{ afterTitle }}</h5>
        </div>
      </div>
    </div>

    <div v-if="isView">
      <div class="form-element" v-for="forecast in weatherForecast" v-bind:key="forecast.id">
        <p class="form-element__date">{{ new Date(forecast.dt * 1000).toLocaleDateString() }}</p>
        <div class="form-element__titles">
          <div v-for="title in titles" v-bind:key="title.id" class="form-element__title">
            <h5>{{ title }}</h5>
          </div>
        </div>
        <div class="form-element__datas">
          <div class="form-element__data">
            <h5>{{ forecast.main.temp }}</h5>
            <h5>{{ forecast.main.humidity }}</h5>
          </div>
        </div>
        <div class="form-element__metrics">
          <div v-for="afterTitle in afterTitles" v-bind:key="afterTitle.id" class="form-element__metric">
            <h5>{{ afterTitle }}</h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="sass">
.form-block
  display: flex
  flex-direction: column
  justify-content: center
  width: 100%
  height: 360px
  padding: 20px
  background: #181818

.form-element
  display: grid
  grid-template-areas: "date title data metric"
  grid-template-columns: 2fr repeat(3, 1fr)
  grid-gap: 10px
  align-items: center
  font-size: 17px
  color: #9f9f9f
  padding: 5px 0 5px 35px
  border-bottom: 1px solid #216b4c7d

  &__date
    grid-area: date
    color: #ffa4c7c4

  &__titles
    grid-area: title
    justify-self: flex-end

  &__datas
    grid-area: data
    color: #01bd7e

    & h5
      display: grid
      justify-content: end

  &__metrics
    grid-area: metric
</style>
