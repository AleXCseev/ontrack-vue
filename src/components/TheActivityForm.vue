<template>
    <form @submit.prevent="submit" class="sticky bottom-[52px] flex gap-2 border-t bg-white p-4">
        <input   
            v-model="activity"
            type="text" 
            class="w-full rounded border px-4 text-xl" placeholder="Activity name"
        >
        <BaseButton :disabled="activity.trim() === ''">
            <PlusIcon class="h-8"/>
        </BaseButton>
    </form>
</template>

<script setup>
import { nextTick, ref } from "vue"
import { isActivityValid } from "../validators";
import BaseButton from "./BaseButton.vue";
import { PlusIcon } from "@heroicons/vue/24/solid";

const emit = defineEmits({
    submit: isActivityValid
})

const activity = ref('')

function submit() {
    emit('submit', activity.value)

    activity.value = ''

    nextTick(() => {
        window.scrollTo(0, document.body.scrollHeight)
    })   
}
</script>