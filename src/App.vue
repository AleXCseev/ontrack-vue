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
      :activities="activities"
      @delete-activity="deleteActivity"
    />
    <TheProgress v-show="currentPage === PAGE_PROGRESS"/>
  </main>
  
  <TheNav />

</template>

<script setup>
  import { ref, computed, provide, readonly } from 'vue'
  import { currentPage, timelineRef } from './router';
  import * as keys from "./keys"
  import TheHeader from './components/TheHeader.vue'
  import TheNav from './components/TheNav.vue'
  import TheTimeline from './pages/TheTimeline.vue';
  import TheActivities from './pages/TheActivities.vue';
  import TheProgress from './pages/TheProgress.vue';
  import { PAGE_TIMELINE, PAGE_ACTIVITIES, PAGE_PROGRESS } from './constants';
  import { generateTimelineItems, generateActivitySelectOptions, generatePeriodSelectOptions, generateActivities } from "./functions"

  const activities = ref(generateActivities());

  const timelineItems = ref(generateTimelineItems(activities.value))

  const activitySelectOptions = computed(() => generateActivitySelectOptions(activities.value));

  function deleteActivity(activity) {
    timelineItems.value.forEach((timelineItem) => {
      if(timelineItem.activityId === activity.id) {
        timelineItem.activityId = null
        timelineItem.activitySeconds = 0
      }
    })

    activities.value.splice(activities.value.indexOf(activity), 1)
  }

  function createActivity(activity) {
    activities.value.push(activity)
  }

  function setTimelineItemActivity(timelineItem, activityId) {
    timelineItem.activityId = activityId
  }

  function updateTimelineItemActivitySeconds(timelineItem, activitySeconds) {
    timelineItem.activitySeconds += activitySeconds
  }

  function setActivitySecondsToComplite(activity, secondsToComplite) {
    activity.secondsToComplite = secondsToComplite || 0
  }

  provide(keys.updateTimelineItemActivitySecondsKey, updateTimelineItemActivitySeconds)
  provide(keys.setTimelineItemActivityKey, setTimelineItemActivity)
  provide(keys.setActivitySecondsToCompliteKey, setActivitySecondsToComplite)
  provide(keys.createActivityKey, createActivity)
  provide(keys.deleteActivityKey, deleteActivity)
  provide(keys.timelineItemsKey, readonly(timelineItems.value))
  provide(keys.activitySelectOptionsKey, readonly(activitySelectOptions.value))
  provide(keys.periodSelectOptionsKey, readonly(generatePeriodSelectOptions()))
</script>
