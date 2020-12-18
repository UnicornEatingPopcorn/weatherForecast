<template lang="pug">
  li.form-block
    .form-element(v-if="isView")
      p.margin {{date}}
      div
        li(v-for="name in names")
          h5 {{name}}
      div
        li(v-for="today in todayWeather")
          h5 {{today}}
      div
        li(v-for="afterName in afterNames")
          h5 {{afterName}}

    .form-element(v-if="isView" v-for="forecast in weatherForecast")
      p.margin {{new Date(forecast.dt * 1000).toLocaleDateString()}}
      div
        li(v-for="name in names")
          h5 {{name}}
      div
        li
          h5 {{forecast.temp.day}}
          h5 {{forecast.humidity}}
      div
        li(v-for="afterName in afterNames")
          h5 {{afterName}}
</template>

<script>
export default {
  props: {
    todayWeather: Object,
    date: String,
    isView: Boolean,
    weatherForecast: Array,
  },
  data() {
    return {
      names: [
      "Температура","Влажность"
      ],
      afterNames: [
      "°С", "%"
      ],
    }
  },
}
</script>

<style lang="sass">
li
  display: block
  margin-left: 26px
  font-size: 16px

.form-block
  display: flex
  flex-direction: column
  justify-content: flex-start
  width: 350px
  height: 360px
  background: white
  margin-left: 27px
  border-radius: 32px
  overflow: scroll

.form-element
  display: inherit

.margin
  margin-left: 26px
  margin-top: 20px
</style>
