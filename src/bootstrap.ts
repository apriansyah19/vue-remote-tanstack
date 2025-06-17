import { createApp, defineComponent, h } from "vue";
import { VueQueryPlugin, QueryClient } from "@tanstack/vue-query";
import router from "./router"; // 👈 Tambahkan ini
import Title from "@/components/Title.vue";
import "./assets/tailwind.css";

// Import semua halaman
import WithoutTanstack from "@/pages/WithoutTanstack/Axios/Index.vue";
import WithTanstack from "@/pages/WithTanstack/Axios/Index.vue";

const routes: Record<string, any> = {
  "without-tanstack": WithoutTanstack,
  "with-tanstack": WithTanstack,
};

export default function mount(el: Element, route: string) {
  const TargetComponent =
    routes[route] ||
    defineComponent({
      render: () => h("div", "Page not found"),
    });

  const queryClient = new QueryClient();

  const RootComponent = defineComponent({
    setup() {
      return () => h("div", [h(Title), h(TargetComponent)]);
    },
  });

  const app = createApp(RootComponent);
  app.use(router); // ✅ Penting
  app.use(VueQueryPlugin, { queryClient });
  app.mount(el);
}
