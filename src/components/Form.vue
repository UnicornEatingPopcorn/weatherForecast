<template lang="pug">
  .form-component
    .form
      .form_input
        input.form_input-style(v-model="city" placeholder="Введите город")
        p.form_p-style Искать по городу: {{query || city}}
        p.form_reply {{reply}}
      FormElement(:todayWeather="todayWeather" :date="date" :isView="view" :weatherForecast="weatherForecast")
</template>

<script>
import FormElement from "@/components/FormElement.vue"
import _ from 'lodash'

export default {
  components: {FormElement},
  data() {
    return {
        city: '',
        reply: "",
        todayWeather: {},
        date: "",
        view: false,
        coordinates: {},
        weatherForecast: [],
        query: ""
      };
  },
  watch: {
    city() {
      this.reply = "Жду, когда вы закончите печатать..."
      this.debouncedReply()
      this.$router.push({query: {q: this.city}})
    }
  },
  created() {
    if (this.$route.query.q) {
      this.query = this.$route.query.q
      this.getWeather()
    } else {
      this.query = ""
    }
    this.debouncedReply = _.debounce(this.getReply, 1000)
  },
  methods: {
    getReply() {
      this.reply = "Считаю звезды на небе..."
      this.getWeather()
      setTimeout(()=> {
        this.reply = ""
      }, 500)
    },
    async getWeather() {
      if(this.query) {
        await this.$store.dispatch("getTodayWeather", this.query)
      } else {
        await this.$store.dispatch("getTodayWeather", this.city)
      }
      this.todayWeather = this.$store.getters["todayWeather"]
      this.date = this.$store.getters["date"]
      this.view = this.$store.getters["view"]
      this.coordinates = this.$store.getters["coordinates"]
      await this.$store.dispatch("getNextDaysWeather", this.coordinates)
      this.weatherForecast = this.$store.getters["weatherForecast"]
      this.weatherForecast.shift()
    }
  }
}
</script>

<style lang="sass">
.form-component
  display: flex
  align-items: center
  justify-content: center

.form
  width: 400px
  height: 550px
  border: solid 1px #dad4d1
  border-radius: 2px
  margin-top: 40px
  position: relative
  overflow: scroll

  ::after
    background-image: url(../assets/background.jpeg)
    background-size: cover
    top: 0
    left: 0
    bottom: 0
    right: 0
    position: absolute
    z-index: -1
    content: ""

  &_input
    margin-top: 30px

    &-style
      width: 200px
      height: 30px
      font-size: 20px
      border: none
      border-radius: 6px

  &_p-style
    font-size: 18px
    background: #f6f6f685
    margin-bottom: 0px

  &_reply
    height: 30px
    width: 100%
    margin-top: 0px
    background: #f6f6f685
</style>
