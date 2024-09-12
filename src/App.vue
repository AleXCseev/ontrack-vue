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
  import { currentPage, timelineRef } from './router';
  import { deleteActivity } from './activities'
  import { setTimelineItemActivity } from './timelineItems'
  import TheHeader from './components/TheHeader.vue'
  import TheNav from './components/TheNav.vue'
  import TheTimeline from './pages/TheTimeline.vue';
  import TheActivities from './pages/TheActivities.vue';
  import TheProgress from './pages/TheProgress.vue';
  import { PAGE_TIMELINE, PAGE_ACTIVITIES, PAGE_PROGRESS } from './constants';
</script>
