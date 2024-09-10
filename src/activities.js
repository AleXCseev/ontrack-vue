import { computed, ref } from "vue";
import { SECONDS_IN_HOUR } from "./constants";
import { id } from "./functions";

export const activities = ref(generateActivities());

export const activitySelectOptions = computed(() => generateActivitySelectOptions(activities.value));

export function deleteActivity(activity) {
  

  activities.value.splice(activities.value.indexOf(activity), 1)
}

export function createActivity(activity) {
  activities.value.push(activity)
}

export function setActivitySecondsToComplite(activity, secondsToComplite) {
    activity.secondsToComplite = secondsToComplite || 0
}

function generateActivitySelectOptions(activities) {
    return activities.map((activity) => ({ label: activity.name, value: activity.id }))
  }
  
function generateActivities() {
    return ['Codding', 'Reading', 'Training'].map((name, hours) => ({
        id: id(),
        name,
        secondsToComplite: hours * SECONDS_IN_HOUR
    }))
}