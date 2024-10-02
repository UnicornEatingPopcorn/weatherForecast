<template>
  <div class="about">
    <h1>Why do we need to know about current weather?</h1>
    <ol class="about__info">
      <li>
        Safety: Accurate weather updates help protect people from dangerous situations like floods, heatwaves, or icy conditions, ensuring timely preparation or evacuation.
      </li>
      <li>Travel and Commute: Weather can significantly affect travel plans. Knowing current and forecasted conditions can help avoid delays, road closures, or dangerous driving conditions.
      </li>
      <li>Health: For those with health conditions like asthma, weather updates on pollen levels, humidity, and temperature are crucial for managing symptoms.
      </li>
      <li>Outdoor Planning: Staying updated allows people to plan outdoor events, sports, and activities, avoiding sudden weather changes.
      </li>
      <li>Disaster Preparedness: Early weather warnings can provide the necessary time for communities to prepare for natural disasters like hurricanes, floods, or snowstorms.
      </li>
    </ol>
  </div>
</template>

<style lang="sass">
@media (min-width: 1024px)
  .about
    min-height: 50vh
    display: grid
    align-items: center

    &__info
      padding-left: 20px
      font-size: 16px
</style>
