<template>
    <div class="flex flex-col grow ">
        <ul v-if="activities.length" class="divide-y grow">
            <ActivityItem 
                v-for="activity in activities" 
                :activity="activity" 
                :key="activity.id" 
                @delete="emit('deleteActivity', activity)"
                @set-seconds-to-complite="setSecondsToComplite(activity, $event)"
            />
        </ul>
        <TheActivitiesEmptyState v-else/>
        <TheActivityForm @submit="emit('createActivity', $event)"/>
    </div>
</template>

<script setup>
import ActivityItem from "../components/ActivityItem.vue"
import TheActivityForm from "../components/TheActivityForm.vue";
import TheActivitiesEmptyState from "../components/TheActivitiesEmptyState.vue";
import { validateActivities, isActivityValid, isNumber } from "../validators"

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
    setActivitySecondsToComplite(activity, secondsToComplite) {
        return [
            isActivityValid(activity),
            isNumber(secondsToComplite)
        ].every(Boolean)
    }
})

function setSecondsToComplite(activity, secondsToComplite) {
    emit('setActivitySecondsToComplite', activity, secondsToComplite)
}


</script>