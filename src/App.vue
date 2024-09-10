<template>

  <TheHeader/>

  <main class="flex flex-grow flex-col">
    <TheTimeline 
      v-show="currentPage === PAGE_TIMELINE"
      ref="timelineRef"
      @set-timiline-item-activity="setTimelineItemActivity"
    />
    <TheActivities 
      v-show="currentPage === PAGE_ACTIVITIES" 
      @delete-activity="deleteActivity"
    />
    <TheProgress v-show="currentPage === PAGE_PROGRESS"/>
  </main>
  
  <TheNav />

</template>

<script setup>
  import { provide, readonly } from 'vue'
  import { currentPage, timelineRef } from './router';
  import {
    setActivitySecondsToComplite,
    activitySelectOptions,
    createActivity,
    deleteActivity,
  } from './activities'
  import {
    updateTimelineItemActivitySeconds,
    setTimelineItemActivity,
    resetTimelineItemActivities,
  } from './timelineItems'
  import * as keys from "./keys"
  import TheHeader from './components/TheHeader.vue'
  import TheNav from './components/TheNav.vue'
  import TheTimeline from './pages/TheTimeline.vue';
  import TheActivities from './pages/TheActivities.vue';
  import TheProgress from './pages/TheProgress.vue';
  import { PAGE_TIMELINE, PAGE_ACTIVITIES, PAGE_PROGRESS } from './constants';
  import { generatePeriodSelectOptions } from "./functions"

  provide(keys.updateTimelineItemActivitySecondsKey, updateTimelineItemActivitySeconds)
  provide(keys.setTimelineItemActivityKey, setTimelineItemActivity)
  provide(keys.setActivitySecondsToCompliteKey, setActivitySecondsToComplite)
  provide(keys.createActivityKey, createActivity)
  provide(keys.deleteActivityKey, (activity) => {
    resetTimelineItemActivities(activity)
    deleteActivity(activity)
  })
  provide(keys.activitySelectOptionsKey, activitySelectOptions)
  provide(keys.periodSelectOptionsKey, readonly(generatePeriodSelectOptions()))
</script>
