<script setup lang="js">
import { ref, onMounted, computed } from "vue";
import FormElement from "@/components/FormElement.vue";
import { useCounterStore } from "@/stores/counter";
import { useRoute, useRouter } from 'vue-router';

const store = useCounterStore();
const reply = ref("");
const query = ref("");
const route = useRoute();
const router = useRouter();

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
    await store.dispatch('getNextDaysWeather', coordinates.value);
    weatherForecast.value.shift();
  } catch (error) {
    alert('There is no such city, try again');
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
        :todayWeather="todayWeather"
        :date="date"
        :isView="isView"
        :weatherForecast="weatherForecast"/>
    </div>
  </div>
</template>
