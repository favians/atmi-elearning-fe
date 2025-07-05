import { useQuery } from "@tanstack/react-query";
import { queryClientKeys } from "@/constants/query-client-keys";
import { homeService } from "@/services/homeService";

export const useGetTraining = ({ params }) => {
  const isEnabled = !!params?.topic_id;
  const query = useQuery({
    queryKey: [queryClientKeys.GET_TRAINING, params],
    queryFn: () => homeService.getTraining({ params }),
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
