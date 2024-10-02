<template>
    <div class="mt-7">
        <ul>
           <TimelineItem 
                v-for="timelineItem in timelineItems" 
                :key="timelineItem.hour" 
                :timeline-item="timelineItem" 
                ref="timelineItemRefs"
                @scroll-to-hour="scrollToHour(timelineItem.hour)"
            />
        </ul>
    </div>
</template>

<script setup>
    import { onActivated } from "vue";
    import TimelineItem from "../components/TimelineItem.vue";
    import { timelineItems, scrollToCurrentHour, scrollToHour, timelineItemRefs } from "../timelineItems";

    onActivated(scrollToCurrentHour)
    
</script>