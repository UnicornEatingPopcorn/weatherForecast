<template lang="pug">
  .form-component
    .form
      .form_input
        input.form_input-style(v-model="query" @input="fetchCity" placeholder="Введите город")
        p.form_p-style Искать по городу: {{query}}
        p.form_reply {{reply}}
      FormElement(:todayWeather="todayWeather" :date="date" :isView="isView" :weatherForecast="weatherForecast")
</template>

<script>
import FormElement from "@/components/FormElement.vue"
import _ from 'lodash'

export default {
  components: {FormElement},
  data() {
    return {
        reply: "",
        query: ""
      };
  },
  computed: {
    coordinates() {
      return this.$store.getters["coordinates"]
    },
    todayWeather() {
      return this.$store.getters["todayWeather"]
    },
    date() {
      return this.$store.getters["date"]
    },
    isView() {
      return this.$store.getters["isView"]
    },
    weatherForecast() {
      return this.$store.getters["weatherForecast"]
    }
  },
  async created() {
    this.query = this.$route.query.city

    if (this.query.length > 0) {
      await this.getWeather()
    }
  },
  methods: {
    debouncedReply: _.debounce(function() {
      this.getReply()
    }, 1000),
    fetchCity() {
      this.reply = "Жду, когда вы закончите печатать..."
      this.debouncedReply()

      this.$router.push({query: {city: this.query}})
    },
    async getReply() {
      this.reply = "Считаю звезды на небе..."
      if (this.query.length > 0) {
        await this.getWeather()
        setTimeout(()=>{
          this.reply = ""
        }, 500)
      } else {
        this.reply = "Укажите город"
      }
    },
    async getWeather() {
      try {
        await this.$store.dispatch("getTodayWeather", this.query)
        await this.$store.dispatch("getNextDaysWeather", this.coordinates)
        this.weatherForecast.shift()
      } catch(error) {
        alert("Такого города нет, пожалуйста попробуйте еще раз")
        console.error(error)
      }
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
