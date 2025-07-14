import { useQuery } from "@tanstack/react-query";
import { queryClientKeys } from "@/constants/query-client-keys";
import { trainingAdminService } from "@/services/admin/trainingAdminService";

export const useGetTrainerList = () => {
  const query = useQuery({
    queryKey: [queryClientKeys.GET_TRAINER_LIST],
    queryFn: () => trainingAdminService.getTrainerList(),
  });

  return query;
};
