import { useQuery } from "@tanstack/react-query";
import { queryClientKeys } from "@/constants/query-client-keys";
import { trainingTraineeService } from "@/services/trainee/trainingTraineeService";

export const useGetTrainingDetail = ({ params }) => {
  const query = useQuery({
    queryKey: [queryClientKeys.GET_TRAINEE_TRAINING_DETAIL, params],
    queryFn: () => trainingTraineeService.getDetail({ params }),
  });

  return query;
};
