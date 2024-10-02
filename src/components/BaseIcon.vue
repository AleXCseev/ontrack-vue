<template>
    <component :is="icons[name]"/>
</template>

<script setup>
import { 
    CheckCircleIcon as CheckCircle, 
    ListBulletIcon as ListBullet, 
    ChartBarIcon as ChartBar, 
    XMarkIcon as XMark, 
    TrashIcon as Trash, 
    ArrowPathIcon as ArrowPath, 
    PauseIcon as Pause, 
    PlayIcon as Play,
    ClockIcon as Clock,
    PlusIcon as Plus,
} from "@heroicons/vue/24/solid";

defineProps({
    name: {
        required: true,
        type: String,
    }
})

const icons = {
    CheckCircle, 
    ListBullet, 
    ChartBar, 
    XMark, 
    Trash, 
    ArrowPath, 
    Pause, 
    Play,
    Clock,
    Plus,
}
</script>