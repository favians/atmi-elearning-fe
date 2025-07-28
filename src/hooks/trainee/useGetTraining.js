import { useQuery } from "@tanstack/react-query";
import { queryClientKeys } from "@/constants/query-client-keys";
import { trainingTraineeService } from "@/services/trainee/trainingTraineeService";

export const useGetTraining = ({ params }) => {
  const query = useQuery({
    queryKey: [queryClientKeys.GET_TRAINEE_TRAINING, params],
    queryFn: () => trainingTraineeService.getList({ params }),
  });

  return query;
};
