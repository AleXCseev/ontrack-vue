<template>
    <div>
        <ul class="divide-y">
            <ActivityItem 
                v-for="activity in activities" 
                :activity="activity" 
                :key="activity" 
                @delete="emit('deleteActivity', activity)"
            />
        </ul>
        <TheActivityForm @submit="emit('createActivity', $event)"/>
    </div>
</template>

<script setup>
import ActivityItem from "../components/ActivityItem.vue"
import TheActivityForm from "../components/TheActivityForm.vue";
import { validateActivities, isActivityValid } from "../validators"

defineProps({
    activities: {
        required: true,
        type: Array,
        validator: validateActivities
    }
})

const emit = defineEmits({
    deleteActivity: isActivityValid,
    createActivity: isActivityValid,
})


</script>