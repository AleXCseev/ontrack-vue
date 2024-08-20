<template>
    <form @submit.prevent="submit" class="sticky bottom-[52px] flex gap-2 border-t bg-white p-4">
        <input   
            v-model="name"
            type="text" 
            class="w-full rounded border px-4 text-xl" placeholder="Activity name"
        >
        <BaseButton :disabled="name.trim() === ''">
            <PlusIcon class="h-8"/>
        </BaseButton>
    </form>
</template>

<script setup>
import { inject, nextTick, ref } from "vue"
import { id } from "../functions";
import BaseButton from "./BaseButton.vue";
import { PlusIcon } from "@heroicons/vue/24/solid";

const name = ref('')

function submit() {

    createActivity({
        id: id(),
        name: name.value,
        secondsToComplite: 0,
    })

    name.value = ''

    nextTick(() => {
        window.scrollTo(0, document.body.scrollHeight)
    })   
}
const createActivity = inject('createActivity')
</script>