<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  title: string;
  subtitle?: string;
  currentStep: number;
  totalSteps?: number;
}

const props = defineProps<Props>();

const progress = computed(() => {
  if (!props.totalSteps) return 0;
  return (props.currentStep / props.totalSteps) * 100;
});
</script>

<template>
  <div class="min-h-screen flex items-center justify-center p-4">
    <div class="w-full max-w-lg">
      <div class="glass-card">
        <div class="mb-6">
          <h1 class="font-anton text-3xl md:text-4xl text-white mb-2">{{ title }}</h1>
          <p v-if="subtitle" class="text-blue-200">{{ subtitle }}</p>
        </div>
        
        <div class="relative h-1 bg-white/10 rounded mb-6">
          <div 
            class="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-600 to-cyan-500 rounded"
            :style="{ width: `${progress}%` }"
          ></div>
        </div>

        <slot></slot>
      </div>
    </div>
  </div>
</template>