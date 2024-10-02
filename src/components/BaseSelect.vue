<template>
    <div class="flex gap-2">
        <BaseButton @click="select(null)" :type="BUTTON_TYPE_NEUTRAL">
            <BaseIcon name="XMark" class="h-8"/>
        </BaseButton>
        <select class="w-full truncate rounded bg-gray-100 py-1 px-2 text-2xl" @change="select($event.target.value)">
            <option :selected="isNotSelected" disabled value="">{{ placeholder }}</option>
            <option v-for="{ value, label } in options" :key="value" :value="value" :selected="value === selected">
                {{ label }}
            </option>
        </select>
    </div>
</template>

<script setup>
    import BaseIcon from "./BaseIcon.vue";
    import BaseButton from "./BaseButton.vue"
    import { validateSelectOptions, isUndefinedOrNull, isSelectValueValid } from "../validators";
    import { normalizeSelectValue } from "../functions";
    import { computed } from "vue";
    import { BUTTON_TYPE_NEUTRAL } from "../constants";

    const props = defineProps({
        selected: {
            default: 1,
            type: [String, Number],
        },
        options: {
            required: true,
            type: Array,
            validator: validateSelectOptions
        },
        placeholder: {
            default: 'Rest',
            type: String,
        },
    })

    const emit = defineEmits({
        select: isSelectValueValid
    })

    const isNotSelected = computed(() => {
        return isUndefinedOrNull(props.selected)
    })

    function select(value) {
        emit('select', normalizeSelectValue(value))
    }

</script>