<template>
    <li class="flex flex-col gap-1 p-4">
        <div class="truncate text-xl">{{ activity.name }}</div>
        <div class="flex h-5 overflow-hidden rounded bg-neutral-200">
            <div :class="getProgressColorClass(percentage)" :style="`width: ${percentage}%;`"></div>
        </div>
        <div class="flex justify-between font-mono text-sm">
            <span>{{ percentage }}%</span>
            <span>{{  formatSeconds(calculateTrackedActivitySeconds(activity)) }} / {{ formatSeconds(activity.secondsToComplete) }}</span>
        </div>
    </li>
</template>

<script setup>
import { computed } from 'vue';
import { calculateActivityCompletionPercentage } from '../activities';
import { formatSeconds, getProgressColorClass } from '../functions';
import { calculateTrackedActivitySeconds } from '../timelineItems';
import { isActivityValid } from '../validators';
const props = defineProps({
    activity: {
        require: true,
        type: Object,
        validator: isActivityValid
    }
})


const percentage = computed(() => calculateActivityCompletionPercentage(props.activity, calculateTrackedActivitySeconds(props.activity)))

</script>