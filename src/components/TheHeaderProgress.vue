<template>
    <a :href="`#${PAGE_PROGRESS}`" class="text-sm" @click="navigate(PAGE_PROGRESS)">
      <div v-if="false" class="flex items-center gap-1">
        Day complete!
        <BaseIcon name="CheckCircle" class="h-7 text-green-500" />
      </div>
      <div v-else class="flex items-center gap-1">
        <div>Progress: <span class="font-mono">20%</span></div>
        <div class="h-3 w-3 rounded-full bg-red-500"></div>
      </div>
    </a>
</template>

<script setup>
import BaseIcon from "./BaseIcon.vue";
import { navigate } from "../router";
import { PAGE_PROGRESS } from '../constants'
</script>