import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { queryClientKeys } from "@/constants/query-client-keys";
import { homeService } from "@/services/homeService";

export const useGetTraining = ({ params }) => {
  const isEnabled = !!params?.topic_id;

  const query = useInfiniteQuery({
    queryKey: [queryClientKeys.GET_TRAINING, params.topic_id],
    queryFn: ({ pageParam = 1 }) =>
      homeService.getTraining({ params: { ...params, page: pageParam } }),
    getNextPageParam: (lastPage, allPages) => {
      // Cek apakah ada halaman berikutnya
      return lastPage?.pagination?.next_page
        ? allPages.length + 1 // next page number
        : undefined;
    },
    enabled: isEnabled,
  });

  return query;
};

export const useGetDetailTraining = ({ params }) => {
  const isEnabled = !!params?.training_id;
  const query = useQuery({
    queryKey: [queryClientKeys.GET_DETAIL_TRAINING, params],
    queryFn: () => homeService.getDetailTraining({ params }),
    enabled: isEnabled,
  });

  return query;
};
