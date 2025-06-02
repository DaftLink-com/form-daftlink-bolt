<script setup lang="ts">
import { ArrowLeft, ArrowRight } from 'lucide-vue-next';

interface Props {
  canGoBack?: boolean;
  canContinue?: boolean;
  loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  canGoBack: true,
  canContinue: true,
  loading: false
});

const emit = defineEmits<{
  back: [];
  continue: [];
}>();
</script>

<template>
  <div class="flex justify-between mt-8">
    <button 
      v-if="canGoBack"
      @click="emit('back')"
      class="btn-secondary flex items-center gap-2"
      :disabled="loading"
    >
      <ArrowLeft class="w-4 h-4" />
      Retour
    </button>
    <button 
      v-if="canContinue"
      @click="emit('continue')"
      class="btn-primary flex items-center gap-2 ml-auto"
      :disabled="loading"
    >
      Continuer
      <ArrowRight class="w-4 h-4" />
    </button>
  </div>
</template>