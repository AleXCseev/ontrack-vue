<template>
    <nav class="sticky bottom-0 z-10 bg-white">
    <ul class="flex items-center justify-around border-t">
      <NavItem 
        v-for="icon, page in navItems" 
        :key="page" 
        :href="`#${page}`" 
        :class="{ 'bg-gray-200 pointer-events-none': page === currentPage }" 
        @click="currentPage = page" 
      >
        <component :is="icon" class="h-5 w-6"/>
        {{ page }}
      </NavItem>
    </ul>
  </nav>
</template>

<script setup>
  import {ref} from 'vue'
  import { ClockIcon, ListBulletIcon, ChartBarIcon } from "@heroicons/vue/24/outline"
  import NavItem from "./NavItem.vue"

  const navItems = {
    timeline: ClockIcon,
    activities: ListBulletIcon,
    progress: ChartBarIcon,
  }

  const currentPage = ref("timeline")
</script>