import { computed, ref } from "vue";
import { SECONDS_IN_HOUR, HUNDRED_PERCENT } from "./constants";
import { id } from "./functions";

export const activities = ref(generateActivities());

export const trackedActivities = computed(() => {
  return activities.value.filter(({ secondsToComplete }) => secondsToComplete)
})

export const activitySelectOptions = computed(() => generateActivitySelectOptions(activities.value));

export function deleteActivity(activity) {
  activities.value.splice(activities.value.indexOf(activity), 1)
}

export function createActivity(activity) {
  activities.value.push(activity)
}

export function updateActivity(activity, fields) {
  return Object.assign(activity, fields)
}

function generateActivitySelectOptions(activities) {
    return activities.map((activity) => ({ label: activity.name, value: activity.id }))
  }
  
function generateActivities() {
    return ['Codding', 'Reading', 'Training'].map((name, hours) => ({
        id: id(),
        name,
        secondsToComplete: 15 * 60
    }))
}

export function calculateActivityCompletionPercentage({ secondsToComplete }, trackedSeconds) {
  return Math.floor(trackedSeconds * HUNDRED_PERCENT / secondsToComplete)
}