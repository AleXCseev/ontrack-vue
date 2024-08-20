<template>
    <li 
            class="relative flex flex-col gap-2 border-t border-grey-200 py-10 px-4"
        >
            <TimelineHour @click.prevent="emit('scrollToHour', timelineItem.hour)" :hour="timelineItem.hour"/>
            <BaseSelect 
                @select="setTimelineItemActivity(timelineItem, $event)" 
                :options="activitySelectOptions" 
                :placeholder="'Rest'" 
                :selected="timelineItem.activityId"
            />
            <TimelineStopWatch :timeline-item="timelineItem" />
    </li>
</template>

<script setup>
    import { inject } from "vue";
    import BaseSelect from "./BaseSelect.vue"
    import TimelineHour from "./TimelineHour.vue"
    import TimelineStopWatch from "./TimelineStopWatch.vue";
    import { isTimelineItemValid, isHourValid } from "../validators"

    const props = defineProps({
        timelineItem: {
            required: true,
            type: Object,
            validator: isTimelineItemValid
        }
    });

    const activitySelectOptions = inject('activitySelectOptions')
    const setTimelineItemActivity = inject('setTimelineItemActivity')

    const emit = defineEmits({
        scrollToHour: isHourValid,
    })

    
</script>