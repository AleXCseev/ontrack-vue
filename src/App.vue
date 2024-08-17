<template>

  <TheHeader @navigate="goTo($event)"/>

  <main class="flex flex-grow flex-col">
    <TheTimeline 
      v-show="currentPage === PAGE_TIMELINE"
      :current-page="currentPage"
      ref="timeline"
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
  import { ref, computed, provide } from 'vue'
  import TheHeader from './components/TheHeader.vue'
  import TheNav from './components/TheNav.vue'
  import TheTimeline from './pages/TheTimeline.vue';
  import TheActivities from './pages/TheActivities.vue';
  import TheProgress from './pages/TheProgress.vue';
  import { PAGE_TIMELINE, PAGE_ACTIVITIES, PAGE_PROGRESS } from './constants';
  import { normalizePageHash, generateTimelineItems, generateActivitySelectOptions, generatePeriodSelectOptions, generateActivities } from "./functions"

  const currentPage = ref(normalizePageHash())

  const activities = ref(generateActivities());

  const timeline = ref()

  const timelineItems = ref(generateTimelineItems(activities.value))

  const activitySelectOptions = computed(() => generateActivitySelectOptions(activities.value));

  function goTo(page) {
    if(currentPage.value === PAGE_TIMELINE && page === PAGE_TIMELINE) {
      timeline.value.scrollToHour()
    }

    if(page !== PAGE_TIMELINE) {
      document.body.scrollIntoView()
    }
    
    currentPage.value = page
  }

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

  function setTimelineItemActivity(timelineItem, activity) {
    timelineItem.activityId = activity.id
  }

  function updateTimelineItemActivitySeconds(timelineItem, activitySeconds) {
    timelineItem.activitySeconds += activitySeconds
  }

  function setActivitySecondsToComplite(activity, secondsToComplite) {
    activity.secondsToComplite = secondsToComplite
  }

  provide('updateTimelineItemActivitySeconds', updateTimelineItemActivitySeconds)
  provide('timelineItems', timelineItems.value)
  provide('activities', activities.value)
  provide('activitySelectOptions', activitySelectOptions.value)
  provide('periodSelectOptions', generatePeriodSelectOptions())
</script>
