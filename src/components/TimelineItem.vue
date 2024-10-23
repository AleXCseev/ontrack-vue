<template>
    <li 
            class="relative flex flex-col gap-2 border-t border-grey-200 py-10 px-4"
        >
            <TimelineHour :hour="timelineItem.hour"/>
            <BaseSelect 
                @select="updateTimelineItem(timelineItem, { activityId: $event })" 
                :options="activitySelectOptions" 
                :placeholder="'Rest'" 
                :selected="timelineItem.activityId"
            />
            <TimelineStopWatch :timeline-item="timelineItem" />
    </li>
</template>

<script setup>
    import BaseSelect from "./BaseSelect.vue"
    import TimelineHour from "./TimelineHour.vue"
    import TimelineStopWatch from "./TimelineStopWatch.vue";
    import { isTimelineItemValid } from "../validators"
    import { updateTimelineItem } from "../timelineItems";
    import { activitySelectOptions } from "../activities";
 
    const props = defineProps({
        timelineItem: {
            required: true,
            type: Object,
            validator: isTimelineItemValid
        }
    });

</script>