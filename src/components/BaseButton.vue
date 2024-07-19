<template>
    <button :class="`${typeClasses[type]} rounded p-3 disabled:cursor-not-allowed disabled:opacity-50`">
        <slot/>
    </button>
</template>

<script setup>
import { isButtonTypeValid } from '../validators'

defineProps({
    type: {
        default: BUTTON_TYPE_PRIMARY,
        type: String,
        validator: isButtonTypeValid
    }
})

</script>

<script>
import { BUTTON_TYPE_DENGER, BUTTON_TYPE_NEUTRAL, BUTTON_TYPE_PRIMARY } from '../constants';

const typeClasses = {
    [BUTTON_TYPE_NEUTRAL]: 'bg-gray-100 enabled:hover:bg-gray-200',
    [BUTTON_TYPE_DENGER]: 'bg-red-500 enabled:hover:bg-red-600 text-white',
    [BUTTON_TYPE_PRIMARY]: 'bg-purple-500 enabled:hover:bg-purple-600 text-white'
}
</script>