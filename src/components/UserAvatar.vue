<script setup lang="ts">
interface Props {
  initials: string;
}

defineProps<Props>();
</script>

<template>
  <div class="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center">
    <span class="text-white font-semibold">{{ initials }}</span>
  </div>
</template>