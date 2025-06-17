<template>
  <div
    class="flex items-center justify-center gap-3 p-4 bg-white rounded-lg shadow-md"
  >
    <!-- Vue Logo as Image -->
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg"
      alt="Vue Logo"
      class="w-10 h-10"
    />

    <!-- Title Text -->
    <h1 class="text-3xl font-semibold text-[#42b883] animate-fade-in">
      Hii, I'm from Vue
    </h1>
  </div>
</template>

<script setup lang="ts">
// No script logic needed
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.5s ease-out both;
}
</style>
