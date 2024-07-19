<template>
    <li 
            class="relative flex flex-col gap-2 border-t border-grey-200 py-10 px-4"
        >
            <TimelineHour :hour="timelineItem.hour"/>
            <BaseSelect 
                @select="selectedActivityId = $event" 
                :options="activitySelectOptions" 
                :placeholder="'Rest'" 
                :selected="selectedActivityId"
            />
           
    </li>
</template>

<script setup>
    import { ref } from "vue";
    import BaseSelect from "./BaseSelect.vue"
    import TimelineHour from "./TimelineHour.vue"
    import { isTimelineItemValid, validateSelectOptions } from "../validators"

    defineProps({
        timelineItem: {
            required: true,
            type: Object,
            validator: isTimelineItemValid
        },
        activitySelectOptions: {
            required: true,
            type: Array,
            validator: validateSelectOptions
        }
    });

    const selectedActivityId = ref(1)

    
</script>