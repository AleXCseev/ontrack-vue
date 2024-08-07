<template>
    <div class="mt-7">
        <ul>
           <TimelineItem 
                v-for="timelineItem in timelineItems" 
                :key="timelineItem.hour" 
                :timeline-item="timelineItem" 
                :activity-select-options="activitySelectOptions"
                :activities="activities"
                ref="timelineItemRefs"
                @scroll-to-hour="scrollToHour"
                @select-activity="emit('setTimilineItemActivity', timelineItem, $event )"
            />
        </ul>
    </div>
</template>

<script setup>
    import { nextTick, ref, watchPostEffect } from "vue";
    import TimelineItem from "../components/TimelineItem.vue";
    import { validateTimelineItems, validateActivities, isTimelineItemValid, isActivityValid, validateSelectOptions, isPageValid } from "../validators";
    import { PAGE_TIMELINE, MIDNIGHT_HOUR } from "../constants";
    
    const props = defineProps({
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
        },
        currentPage: {
            required: true,
            type: String,
            validator: isPageValid
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

    defineExpose( {scrollToHour} )

    const timelineItemRefs = ref([])

    watchPostEffect( async () => {
        if(props.currentPage === PAGE_TIMELINE) {
            await nextTick()

            scrollToHour(null, false)
        }
    })

    function scrollToHour(hour = null, isSmooth = true) {
        hour ??= new Date().getHours()

        const options = { behavior: isSmooth ? 'smooth' : 'instant' }
        
        if(hour === MIDNIGHT_HOUR) {
            document.body.scrollIntoView(options)
        } else {
            timelineItemRefs.value[hour -1].$el.scrollIntoView(options)
        }
    }
</script>