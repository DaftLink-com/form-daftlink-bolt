<script setup lang="ts">
import { CreditCard } from 'lucide-vue-next';

interface Props {
  modelValue: string;
  label: string;
  placeholder?: string;
  type?: string;
  icon?: boolean;
  maxLength?: number;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '',
  type: 'text',
  icon: false,
  maxLength: undefined
});

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();
</script>

<template>
  <div class="mb-4">
    <label class="block text-white mb-2">{{ label }}</label>
    <div class="relative">
      <input
        :type="type"
        :value="modelValue"
        @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        :placeholder="placeholder"
        :maxlength="maxLength"
        class="input-field"
        :class="{ 'pl-10': icon }"
      />
      <CreditCard 
        v-if="icon" 
        class="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300 w-4 h-4"
      />
    </div>
  </div>
</template>