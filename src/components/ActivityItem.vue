<template>
     <li class="flex flex-col gap-2 p-4">
        <div class="flex items-center gap-2">
            <BaseButton :type="BUTTON_TYPE_DANGER" @click="deleteAndResetActivity(activity)">
                <BaseIcon :name="ICON_TRASH" />
            </BaseButton>
            <span class="truncate text-xl">{{ activity.name }}</span>
        </div>
        <div class="flex gap-2">
            <BaseSelect
                class="font-mono grow" 
                placeholder="hh:mm" 
                :options="PERIOD_SELECT_OPTIONS" 
                @select="updateActivity(activity, { secondsToComplete: $event || 0 })"
            />
            <ActivitySecondsToComplete :activity="activity" v-if="activity.secondsToComplete" /> 
        </div>
    </li> 
</template>

<script setup>
import BaseButton from "./BaseButton.vue";
import BaseSelect from "./BaseSelect.vue";
import BaseIcon from "./BaseIcon.vue"
import ActivitySecondsToComplete from "./ActivitySecondsToComplete.vue";
import { BUTTON_TYPE_DANGER, PERIOD_SELECT_OPTIONS } from "../constants";
import { isActivityValid } from "../validators"
import { updateActivity, deleteActivity } from "../activities"
import { resetTimelineItemActivities } from "../timelineItems";
import { ICON_TRASH } from "../icons";


defineProps({
    activity: {
        required: true,
        type: Object,
        validator: isActivityValid
    }
})

function deleteAndResetActivity(activity) {
    resetTimelineItemActivities(activity)
    deleteActivity(activity)
}

</script>