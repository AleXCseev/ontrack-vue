<template>
    <button :class="`${typeClasses[type]} rounded p-3 disabled:cursor-not-allowed disabled:opacity-50`">
        <slot/>
    </button>
</template>

<script setup>

defineProps({
    type: {
        default: 'neutral',
        type: string,
    }
})

const typeClasses = {
    neutral: 'bg-gray-100 enabled:hover:bg-gray-200',
    danger: 'bg-red-500 enabled:hover:bg-red-600 text-white'
}

</script>