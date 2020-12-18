<template lang="pug">
  .form-block
    .form-element(v-if="isView")
      div
        li.date(v-for="date in dates")
          h4 {{date}}
        li.date(v-for="forecast in weatherForecast")
          p {{new Date(forecast.dt * 1000).toLocaleDateString()}}
      div
        li(v-for="name in names")
          h5 {{name}}
        li(v-for="name in names")
          h5 {{name}}
      div
        li(v-for="today in todayWeather")
          h5 {{today}}
      div
        li(v-for="afterName in afterNames")
          h5 {{afterName}}

</template>

<script>
export default {
  props: {
    todayWeather: Object,
    dates: Array,
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
  justify-content: flex-start
  width: 350px
  height: 360px
  background: white
  margin-left: 27px
  border-radius: 32px
  overflow: scroll

.form-element
  display: contents

.date
  height: 80px

</style>
