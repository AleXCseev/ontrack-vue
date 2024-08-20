<template>
    <div class="mt-7">
        <ul>
           <TimelineItem 
                v-for="timelineItem in timelineItems" 
                :key="timelineItem.hour" 
                :timeline-item="timelineItem" 
                ref="timelineItemRefs"
                @scroll-to-hour="scrollToHour"
            />
        </ul>
    </div>
</template>

<script setup>
    import { nextTick, ref, watchPostEffect, inject } from "vue";
    import TimelineItem from "../components/TimelineItem.vue";
    import { isPageValid } from "../validators";
    import { PAGE_TIMELINE, MIDNIGHT_HOUR } from "../constants";
    
    const props = defineProps({
        currentPage: {
            required: true,
            type: String,
            validator: isPageValid
        }
    })

    defineExpose( {scrollToHour} )

    const timelineItems = inject('timelineItems')
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