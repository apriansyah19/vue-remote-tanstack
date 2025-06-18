import { useQuery, type UseQueryReturnType } from "@tanstack/vue-query";
import { fetchPosts } from "@/api/posts";
import { unref, type Ref } from "vue";
import { persister } from "./query/persister";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export function usePostsQuery(
  failUntilCount: Ref<number> | number
): UseQueryReturnType<Post[], Error> {
  return useQuery<Post[], Error>({
    queryKey: ["posts", unref(failUntilCount)],
    queryFn: () =>
      fetchPosts(unref(failUntilCount)).then((res) => {
        return res;
      }),
    retry: 5,
    retryDelay: 1000,
    persister: persister.persisterFn,
    staleTime: 1000 * 10, // 10 detik
    gcTime: Infinity, //,
    // refetchInterval: 10000, // Uncomment jika ingin polling tiap 10 detik
    // refetchIntervalInBackground: true,
  });
}
