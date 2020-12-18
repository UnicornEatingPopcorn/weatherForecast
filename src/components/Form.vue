<template lang="pug">
  .form-component
    .form
      .form_input
        input.form_input-style(v-model="city" placeholder="Введите город")
        p.form_p-style Искать по городу: {{city}}
        p {{reply}}
      FormElement(:todayWeather="todayWeather" :dates="dates" :isView="view")
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
        dates: [],
        view: false
      };
  },
  watch: {
    city() {
      this.reply = "Жду, когда вы закончите печатать..."
      this.debouncedReply()
    }
  },
  created() {
    this.debouncedReply = _.debounce(this.getReply, 1000)
  },
  methods: {
    async getReply() {
      this.reply = "Считаю звезды на небе..."
      await this.$store.dispatch("getTodayWeather", this.city)
      this.todayWeather = this.$store.getters["todayWeather"]
      this.dates = this.$store.getters["dates"]
      this.view = this.$store.getters["view"]
      setTimeout(()=> {
        this.reply = ""
      }, 500)
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
  height: 500px
  border: solid 1px #dad4d1
  border-radius: 2px
  margin-top: 40px
  position: relative
  overflow: scroll

  ::after
    background-image: url(../assets/background.jpeg)
    background-size: cover
    opacity: 0.1
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
</style>
