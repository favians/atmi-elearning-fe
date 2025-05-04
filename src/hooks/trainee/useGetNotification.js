import { useQuery } from "@tanstack/react-query";
import { queryClientKeys } from "@/constants/query-client-keys";
import { notificationTraineeService } from "@/services/trainee/notificationTraineeService";

export const useGetNotification = () => {
  const query = useQuery({
    queryKey: [queryClientKeys.GET_TRAINEE_NOTIFICATION],
    queryFn: () => notificationTraineeService.getNotif(),
  });

  return query;
};
