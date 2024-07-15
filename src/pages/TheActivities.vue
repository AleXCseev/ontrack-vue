<template>
    <div>
        <ul class="divide-y">
            <ActivityItem v-for="activity in activities" :activity="activity" :key="activity" />
        </ul>
    </div>
</template>

<script setup>
import ActivityItem from "../components/ActivityItem.vue"
import { validateActivities } from "../validators"

defineProps({
    activities: {
        required: true,
        type: Array,
        validator: validateActivities
    }
})


</script>