<script setup lang="ts">
import { ref, computed, onMounted, onBeforeMount } from "vue";
import { usePostsQuery } from "@/composable/usePosts";
import { fetchPosts, resetCallCount } from "@/api/posts";
import ErrorSelect from "@/components/select/ErrorSelect.vue";
import DotSpinner from "@/components/loading/DotSpinner.vue";
import { useRouter } from "vue-router";

const errCount = ref<number | null>(null);
const effectiveErrorCount = computed(() => errCount.value ?? 0);
const router = useRouter();

const {
  data: posts,
  isLoading,
  isFetching,
  isError,
  error,
  refetch,
} = usePostsQuery(effectiveErrorCount);
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center p-4">
    <ErrorSelect
      v-if="!isLoading && !isFetching"
      class="mb-3"
      v-model="errCount"
    />
    <button
      v-if="!isLoading && !isFetching"
      @click="
        {
          resetCallCount();
          refetch();
        }
      "
      class="px-4 py-2 mb-4 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      Reload
    </button>
    <div v-if="isLoading || isFetching" class="text-lg text-blue-600">
      <DotSpinner></DotSpinner>
    </div>
    <div v-else-if="isError" class="text-lg text-red-600">
      {{ error?.message }}
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
