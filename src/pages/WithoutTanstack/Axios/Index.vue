<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { fetchPosts } from "@/api/posts";
import ErrorSelect from "@/components/select/ErrorSelect.vue";
import DotSpinner from "@/components/loading/DotSpinner.vue";
import { resetCallCount } from "@/api/posts";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const errCount = ref<number | null>(null);
const posts = ref<Post[]>([]);
const isLoading = ref<boolean>(false);
const isError = ref<boolean>(false);
const errorMessage = ref<string | unknown>("");

const effectiveErrorCount = computed(() => errCount.value ?? 0);

const MAX_RETRIES = 5;

const loadPosts = async () => {
  isLoading.value = true;
  isError.value = false;
  let attempt = 0;

  while (attempt < MAX_RETRIES) {
    try {
      const data = await fetchPosts(effectiveErrorCount.value);
      posts.value = data;
      isError.value = false;
      break;
    } catch (err) {
      attempt++;
      isError.value = true;
      errorMessage.value = `Attempt ${attempt} failed: ${String(err)}`;

      if (attempt >= MAX_RETRIES) {
        console.error("Max retries reached");
        break;
      }

      await new Promise((resolve) => setTimeout(resolve, 300));
    }
  }

  isLoading.value = false;
};
onMounted(loadPosts);
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center p-4">
    <ErrorSelect v-if="!isLoading" class="mb-3" v-model="errCount" />
    <button
      v-if="!isLoading"
      class="px-4 py-2 mb-4 bg-blue-600 text-white rounded hover:bg-blue-700"
      @click="
        {
          resetCallCount();
          loadPosts();
        }
      "
    >
      Reload
    </button>
    <div v-if="isLoading" class="text-lg text-blue-600">
      <DotSpinner></DotSpinner>
    </div>
    <div v-else-if="isError" class="text-lg text-red-600">
      {{ errorMessage }}
    </div>
    <ul v-else class="text-left space-y-2 max-w-xl w-full">
      <li
        v-for="post in posts"
        :key="post.id"
        class="p-4 border rounded shadow"
      >
        <h3 class="font-semibold">{{ post.title }}</h3>
        <p class="text-sm text-gray-700">{{ post.body }}</p>
      </li>
    </ul>
  </div>
</template>
