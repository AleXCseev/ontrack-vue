<template>
    <li 
            class="relative flex flex-col gap-2 border-t border-grey-200 py-10 px-4"
        >
            <TimelineHour @click.prevent="emit('scrollToHour', timelineItem.hour)" :hour="timelineItem.hour"/>
            <BaseSelect 
                @select="selectActivity" 
                :options="activitySelectOptions" 
                :placeholder="'Rest'" 
                :selected="timelineItem.activityId"
            />
            <TimelineStopWatch :seconds="timelineItem.activitySeconds" :hour="timelineItem.hour"/>
    </li>
</template>

<script setup>
    import BaseSelect from "./BaseSelect.vue"
    import TimelineHour from "./TimelineHour.vue"
    import TimelineStopWatch from "./TimelineStopWatch.vue";
    import { NULLABLE_ACTIVITY } from "../constants";
    import { isActivityValid, isTimelineItemValid, validateActivities, validateSelectOptions, isHourValid } from "../validators"

    const props = defineProps({
        timelineItem: {
            required: true,
            type: Object,
            validator: isTimelineItemValid
        },
        activities: {
            required: true,
            type: Array,
            validator: validateActivities
        },
        activitySelectOptions: {
            required: true,
            type: Array,
            validator: validateSelectOptions
        }
    });

    const emit = defineEmits({
        selectActivity: isActivityValid,
        scrollToHour: isHourValid,
    })

    function selectActivity(id) {
        emit(
            'selectActivity', 
            findActivityById(id)
        )
    }

    function findActivityById(id) {
        return  props.activities.find((activity) => activity.id === id) || NULLABLE_ACTIVITY
    }

    
</script>