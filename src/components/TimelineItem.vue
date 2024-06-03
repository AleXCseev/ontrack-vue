<template>
    <li 
            class="relative flex flex-col gap-2 border-t border-grey-200 py-10 px-4"
        >
            <a 
                href="#" 
                :class="hourLinkClasses"
            >
                {{ timelineItem.hour }}:00
            </a>
            <BaseSelect :options="options" :placeholder="'Rest'" :selected="selectedActivityId"/>
           
    </li>
</template>

<script setup>
    import { HOURS_IN_DAY } from "../constants";
    import BaseSelect from "./BaseSelect.vue"
   
    const props = defineProps({
        timelineItem: {
            required: true,
            type: Object,
            validator({ hour }) {
                return typeof hour === 'number' && hour >= 0 && hour < HOURS_IN_DAY
            }
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

    const selectedActivityId = 2

    const hourLinkClasses = [
        "absolute -top-4 left-1/2 -translate-x-1/2 rounded font-mono text-lg",
        props.timelineItem.hour === new Date().getHours() ? "bg-purple-900 font-black text-white" : "bg-gray-100 text-gray-500"
    ]
</script>