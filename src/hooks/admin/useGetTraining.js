import { useQuery } from "@tanstack/react-query";
import { queryClientKeys } from "@/constants/query-client-keys";
import { trainingAdminService } from "@/services/admin/trainingAdminService";

export const useGetTrainingList = () => {
  const query = useQuery({
    queryKey: [queryClientKeys.GET_INTERNAL_TRAINING_LIST],
    queryFn: () => trainingAdminService.getOptionList(),
  });

  return query;
};
