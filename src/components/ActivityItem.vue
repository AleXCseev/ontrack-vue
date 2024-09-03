<template>
     <li class="flex flex-col gap-2 p-4">
        <div class="flex items-center gap-2">
            <BaseButton :type="BUTTON_TYPE_DANGER" @click="deleteActivity(activity)">
                <TrashIcon class="h-8"/>
            </BaseButton>
            <span class="truncate text-xl">{{ activity.name }}</span>
        </div>
        <div class="flex gap-2">
            <BaseSelect 
                :selected="activity.secondsToComplite || null" 
                class="font-mono grow" 
                placeholder="hh:mm" 
                :options="periodSelectOptions" 
                @select="setActivitySecondsToComplite(activity, $event)"
            />
            <ActivitySecondsToComplete :activity="activity" v-if="activity.secondsToComplite" /> 
        </div>
    </li> 
</template>

<script setup>
import { TrashIcon } from "@heroicons/vue/24/solid";
import BaseButton from "./BaseButton.vue";
import BaseSelect from "./BaseSelect.vue";
import ActivitySecondsToComplete from "./ActivitySecondsToComplete.vue";
import { BUTTON_TYPE_DANGER } from "../constants";
import { isActivityValid } from "../validators"
import { inject } from "vue";
import { deleteActivityKey, periodSelectOptionsKey, setActivitySecondsToCompliteKey } from "../keys";


defineProps({
    activity: {
        required: true,
        type: Object,
        validator: isActivityValid
    }
})

const periodSelectOptions = inject(periodSelectOptionsKey)
const setActivitySecondsToComplite = inject(setActivitySecondsToCompliteKey)
const deleteActivity = inject(deleteActivityKey)

</script>