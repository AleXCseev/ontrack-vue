<template>
    <li 
            class="relative flex flex-col gap-2 border-t border-grey-200 py-10 px-4"
        >
            <TimelineHour @click.prevent="emit('scrollToHour')" :hour="timelineItem.hour"/>
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
    import { isTimelineItemValid, isUndefined } from "../validators"
    import { activitySelectOptionsKey, setTimelineItemActivityKey } from "../keys";

    const props = defineProps({
        timelineItem: {
            required: true,
            type: Object,
            validator: isTimelineItemValid
        }
    });

    const activitySelectOptions = inject(activitySelectOptionsKey)
    const setTimelineItemActivity = inject(setTimelineItemActivityKey)

    const emit = defineEmits({
        scrollToHour: isUndefined,
    })

    
</script>