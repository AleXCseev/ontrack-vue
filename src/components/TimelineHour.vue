<template>
    <a 
        href="#" 
        :class="classes"
    >
        {{ formatedHour }}
    </a>
</template>

<script setup>
    import { isHourValid } from "../validators";
    import { currentHour } from "../functions";

    const props = defineProps({
        hour: {
            required: true,
            type: Number,
            validator: isHourValid
        }
    });

    const formatedHour = `${props.hour.toString().padStart(2, 0)}:00`

    const classes = [
        "absolute px-1 -top-4 left-1/2 -translate-x-1/2 rounded font-mono text-lg",
        props.hour === currentHour() ? "bg-purple-900 font-black text-white" : "bg-gray-100 text-gray-500"
    ]
</script>>
