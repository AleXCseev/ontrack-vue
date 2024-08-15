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
            <TimelineStopWatch :timeline-item="timelineItem" />
    </li>
</template>

<script setup>
    import { inject } from "vue";
    import BaseSelect from "./BaseSelect.vue"
    import TimelineHour from "./TimelineHour.vue"
    import TimelineStopWatch from "./TimelineStopWatch.vue";
    import { NULLABLE_ACTIVITY } from "../constants";
    import { isActivityValid, isTimelineItemValid, isHourValid } from "../validators"

    const props = defineProps({
        timelineItem: {
            required: true,
            type: Object,
            validator: isTimelineItemValid
        }
    });

    const activities = inject('activities')
    const activitySelectOptions = inject('activitySelectOptions')

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
        return activities.find((activity) => activity.id === id) || NULLABLE_ACTIVITY
    }

    
</script>