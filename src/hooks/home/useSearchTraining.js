import { useQuery } from "@tanstack/react-query";
import { queryClientKeys } from "@/constants/query-client-keys";
import { homeService } from "@/services/homeService";

export const useSearchTraining = ({ params }) => {
  const query = useQuery({
    queryKey: [queryClientKeys.GET_SEARCH_TRAINING, params],
    queryFn: () => homeService.getSearchTraining({ params }),
    enabled: params.enabled,
  });

  return query;
};
