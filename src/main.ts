import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import "./assets/tailwind.css";
import { experimental_createQueryPersister } from "@tanstack/query-persist-client-core";
import { VueQueryPlugin, QueryClient } from "@tanstack/vue-query";

import { get, set, del, createStore } from "idb-keyval";

const store = createStore("vuecache", "query");

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       gcTime: 1000 * 60 * 30, // 30 menit
//       staleTime: 1000 * 60 * 10, // 10 menit
//     },
//   },
// });

// // Buat IndexedDB storage adapter
// const persister = experimental_createQueryPersister({
//   storage: {
//     getItem: (key) => get(key, createStore("vuecache", "query")),
//     setItem: (key, value) => set(key, value, createStore("vuecache", "query")),
//     removeItem: (key) => del(key, createStore("vuecache", "query")),
//   },
// });

// // // Atur persister per-query via defaultOptions.defaultOptions.queries.persister
// queryClient.setDefaultOptions({
//   queries: {
//     persister: persister.persisterFn,
//   },
// });

// Pasang plugin
const app = createApp(App);
app.use(VueQueryPlugin);
app.use(router);
app.mount("#app");
