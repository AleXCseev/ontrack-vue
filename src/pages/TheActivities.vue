<template>
    <div>
        <ul class="divide-y">
            <ActivityItem v-for="activity in activities" :activity="activity" :key="activity" />
        </ul>
    </div>
</template>

<script setup>
import ActivityItem from "../components/ActivityItem.vue"

const activities = ['Codding', 'Reading', 'Training'];


</script>