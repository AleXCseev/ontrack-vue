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
  import { ref, computed, provide } from 'vue'
  import { currentPage, timelineRef } from './router';
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
    activity.secondsToComplite = secondsToComplite
  }

  provide('updateTimelineItemActivitySeconds', updateTimelineItemActivitySeconds)
  provide('timelineItems', timelineItems.value)
  // provide('activities', activities.value)
  provide('activitySelectOptions', activitySelectOptions.value)
  provide('periodSelectOptions', generatePeriodSelectOptions())
  provide('setTimelineItemActivity', setTimelineItemActivity)
  provide('setActivitySecondsToComplite', setActivitySecondsToComplite)
  provide('createActivity', createActivity)
  provide('deleteActivity', deleteActivity)
</script>
