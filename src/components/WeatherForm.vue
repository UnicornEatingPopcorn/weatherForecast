<script setup lang="js">
import { ref, onMounted, computed } from "vue";
import FormElement from "@/components/FormElement.vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from 'vue-router';

const reply = ref("");
const query = ref("");
const route = useRoute();
const router = useRouter();
const store = useStore();

const coordinates = computed(() => store.getters['coordinates']);
const todayWeather = computed(() => store.getters['todayWeather']);
const date = computed(() => store.getters['date']);
const isView = computed(() => store.getters['isView']);
const weatherForecast = computed(() => store.getters['weatherForecast']);

const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

const debouncedReply = debounce(() => getReply(), 1000);

const fetchCity = () => {
  reply.value = "Waiting when you stop typing...";
  debouncedReply();
  router.push({ query: { city: query.value } });
};

const getReply = async () => {
  reply.value = "Counting stars in the sky...";
  if (query.value.length > 0) {
    await getWeather();
    setTimeout(() => {
      reply.value = '';
    }, 500);
  } else {
    reply.value = "Type what city you're interested in";
  }
};

const getWeather = async () => {
  try {
    await store.dispatch('getTodayWeather', query.value);
    await store.dispatch("getNextDaysWeather", coordinates.value);
  } catch (error) {
    console.error(error);
  }
};

onMounted(async () => {
  query.value = route.query.city || '';

  if (query.value.length > 0) {
    await getWeather();
  }
});
</script>

<template>
  <div class="form-component">
    <div class="form">
      <div class="form_input">
        <input class="form_input-style" v-model="query" @input="fetchCity" placeholder="Type the city"/>
        <p class="form_p-style"> Search by: {{ query }}</p>
        <p class="form_reply">{{ reply }}</p>
      </div>
      <FormElement
        :coordinates="coordinates"
        :todayWeather="todayWeather"
        :date="date"
        :isView="isView"
        :weatherForecast="weatherForecast"
        />
    </div>
  </div>
</template>

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
    background-image: url("../assets/background.webp")
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
