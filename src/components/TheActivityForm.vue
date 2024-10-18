<template>
    <form @submit.prevent="submit" class="sticky bottom-[52px] flex gap-2 border-t bg-white p-4">
        <input   
            v-model="name"
            type="text" 
            class="w-full rounded border px-4 text-xl" placeholder="Activity name"
        >
        <BaseButton :disabled="name.trim() === ''">
            <BaseIcon :name="ICON_PLUS"/>
        </BaseButton>
    </form>
</template>

<script setup>
import { nextTick, ref } from "vue"
import { id } from "../functions";
import BaseButton from "./BaseButton.vue";
import BaseIcon from "./BaseIcon.vue";
import { createActivity } from "../activities";
import { ICON_PLUS } from "../icons";

const name = ref('')

function submit() {

    createActivity({
        id: id(),
        name: name.value,
        secondsToComplete: 0,
    })

    name.value = ''

    nextTick(() => {
        window.scrollTo(0, document.body.scrollHeight)
    })   
}

</script>