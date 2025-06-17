<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps<{
  modelValue: number | null;
}>();
const emit = defineEmits<{
  (e: "update:modelValue", value: number | null): void;
}>();

const selected = ref<number | null>(props.modelValue ?? null);

// Sync prop with local state
watch(
  () => props.modelValue,
  (val) => {
    selected.value = val;
  }
);

// Emit on change
watch(selected, (val) => {
  emit("update:modelValue", val);
});

const clear = () => {
  selected.value = null;
};
</script>

<template>
  <div class="space-y-2 max-w-xs">
    <label class="block text-sm font-medium text-gray-700">
      Berapa kali error API yang diinginkan?
    </label>

    <div class="relative">
      <select
        v-model="selected"
        class="block w-full appearance-none border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500"
      >
        <option :value="null" disabled>Pilih jumlah error</option>
        <option v-for="n in [1, 2, 3, 4, 5, 6]" :key="n" :value="n">
          {{ n }}
        </option>
      </select>

      <button
        v-if="selected !== null"
        @click="clear"
        class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        type="button"
      >
        ✕
      </button>
    </div>
  </div>
</template>
