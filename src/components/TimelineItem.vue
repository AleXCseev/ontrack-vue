<template>
    <li 
            class="relative flex flex-col gap-2 border-t border-grey-200 py-10 px-4"
        >
            <TimelineHour :hour="timelineItem.hour"/>
            <BaseSelect @select="selectedActivityId = $event" :options="options" :placeholder="'Rest'" :selected="selectedActivityId"/>
           
    </li>
</template>

<script setup>
    import { ref } from "vue";
    import BaseSelect from "./BaseSelect.vue"
    import TimelineHour from "./TimelineHour.vue"
    import { isTimelineItemValid } from "../validators"

    defineProps({
        timelineItem: {
            required: true,
            type: Object,
            validator: isTimelineItemValid
        }
    });

    const options = [
        {
            value: 1,
            label: "Codding"
        },
        {
            value: 2,
            label: "Reading"
        },
        {
            value: 3,
            label: "Training"
        },
    ]

    const selectedActivityId = ref(1)

    
</script>