<template>

  <TheHeader @navigate="goTo($event)"/>

  <main class="flex flex-grow flex-col">
    <TheTimeline 
      :timeline-items="timelineItems" 
      v-show="currentPage === PAGE_TIMELINE"
      :activity-select-options="activitySelectOptions"
      :activities="activities"
      @set-timiline-item-activity="setTimelineItemActivity"
    />
    <TheActivities 
      v-show="currentPage === PAGE_ACTIVITIES" 
      :activities="activities"
      @delete-activity="deleteActivity"
      @create-activity="createActivity"
      @set-activity-seconds-to-complite="setActivitySecondsToComplite"
    />
    <TheProgress v-show="currentPage === PAGE_PROGRESS"/>
  </main>
  
  <TheNav :current-page="currentPage" @navigate="goTo($event)" />

</template>

<script setup>
  import { ref, computed } from 'vue'
  import TheHeader from './components/TheHeader.vue'
  import TheNav from './components/TheNav.vue'
  import TheTimeline from './pages/TheTimeline.vue';
  import TheActivities from './pages/TheActivities.vue';
  import TheProgress from './pages/TheProgress.vue';
  import { PAGE_TIMELINE, PAGE_ACTIVITIES, PAGE_PROGRESS } from './constants';
  import { normalizePageHash, generateTimelineItems, generateActivitySelectOptions, generateActivities } from "./functions"

  const timelineItems = ref(generateTimelineItems())

  const activities = ref(generateActivities());

  const activitySelectOptions = computed(() => generateActivitySelectOptions(activities.value));

  const currentPage = ref(normalizePageHash())


  function goTo(page) {
    currentPage.value = page
  }

  function deleteActivity(activity) {
    timelineItems.value.forEach((timelineItem) => {
      if(timelineItem.activityId === activity.id) {
        timelineItem.activityId = null
      }
    })

    activities.value.splice(activities.value.indexOf(activity), 1)
  }

  function createActivity(activity) {
    activities.value.push(activity)
  }

  function setTimelineItemActivity(timelineItem, activity) {
    timelineItem.activityId = activity.id
  }

  function setActivitySecondsToComplite(activity, secondsToComplite) {
    activity.secondsToComplite = secondsToComplite
  }

</script>
