<template>
    <li 
            class="relative flex flex-col gap-2 border-t border-grey-200 py-10 px-4"
        >
            <TimelineHour :hour="timelineItem.hour"/>
            <BaseSelect 
                @select="selectedActivity" 
                :options="activitySelectOptions" 
                :placeholder="'Rest'" 
                :selected="timelineItem.activityId"
            />
           
    </li>
</template>

<script setup>
    import BaseSelect from "./BaseSelect.vue"
    import TimelineHour from "./TimelineHour.vue"
    import { isActivityValid, isTimelineItemValid, validateActivities, validateSelectOptions } from "../validators"

    defineProps({
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
        selectActivity: isActivityValid
    })

    function activitySelect(id) {
        emit('selectActivity', activities.find((activity) => activity.id === id))
    }

    
</script>