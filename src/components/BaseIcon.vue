<template>
    <component :is="icons[name]"/>
</template>

<script setup>
import { isIconValid } from "../validators"

defineProps({
    name: {
        required: true,
        type: String,
        validator: isIconValid
    }
})


</script>