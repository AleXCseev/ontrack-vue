<template>
    <div class="mt-7">
        <ul>
           <TimelineItem 
                v-for="timelineItem in timelineItems" 
                :key="timelineItem.hour" 
                :timeline-item="timelineItem" 
                :activity-select-options="activitySelectOptions"
                :activities="activities"
                @select-activity="emit('setTimilineItemActivity', timelineItem, $event )"
            />
        </ul>
    </div>
</template>

<script setup>
    import TimelineItem from "../components/TimelineItem.vue";
    import { validateTimelineItems, validateActivities, isTimelineItemValid, isActivityValid, validateSelectOptions } from "../validators";
    
    defineProps({
        timelineItems: {
           required: true,
           type: Array, 
           validator: validateTimelineItems,
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
    })

    const emit = defineEmits({
        setTimilineItemActivity(timelineItem, activity) {
            return [
                isTimelineItemValid(timelineItem),
                isActivityValid(activity)
            ].every(Boolean)
        }
    })
</script>