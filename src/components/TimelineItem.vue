<template>
    <li 
            class="relative flex flex-col gap-2 border-t border-grey-200 py-10 px-4"
        >
            <TimelineHour :hour="timelineItem.hour"/>
            <BaseSelect 
                @select="selectActivity" 
                :options="activitySelectOptions" 
                :placeholder="'Rest'" 
                :selected="timelineItem.activityId"
            />
           
    </li>
</template>

<script setup>
    import BaseSelect from "./BaseSelect.vue"
    import TimelineHour from "./TimelineHour.vue"
    import { isActivityValid, isTimelineItemValid, validateActivities, validateSelectOptions, isNull } from "../validators"

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
        selectActivity(activity) {
            return isNull(activity) || isActivityValid
        }
    })

    function selectActivity(id) {
        emit('selectActivity', props.activities.find((activity) => activity.id === id) || null )
    }

    
</script>