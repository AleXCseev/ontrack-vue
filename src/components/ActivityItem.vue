<template>
     <li class="flex flex-col gap-2 p-4">
        <div class="flex items-center gap-2">
            <BaseButton :type="BUTTON_TYPE_DANGER" @click="emit('delete')">
                <TrashIcon class="h-8"/>
            </BaseButton>
            <span class="truncate text-xl">{{ activity.name }}</span>
        </div>
        <div>
            <BaseSelect 
                :selected="activity.secondsToComplite || null" 
                class="font-mono" 
                placeholder="hh:mm" 
                :options="PERIOD_SELECT_OPTIONS" 
                @select="emit('setSecondsToComplite', $event || 0)"
            />
        </div>
    </li> 
</template>

<script setup>
import { TrashIcon } from "@heroicons/vue/24/solid";
import BaseButton from "./BaseButton.vue";
import BaseSelect from "./BaseSelect.vue";
import { PERIOD_SELECT_OPTIONS, BUTTON_TYPE_DANGER } from "../constants";
import { isActivityValid, isUndefined, isNumber } from "../validators"

defineProps({
    activity: {
        required: true,
        type: Object,
        validator: isActivityValid
    },
})

const emit = defineEmits({
    delete: isUndefined,
    setSecondsToComplite: isNumber,
})

</script>