import { useQuery } from "@tanstack/react-query";
import { queryClientKeys } from "@/constants/query-client-keys";
import { trainerAdminService } from "@/services/admin/trainerAdminService";

export const useGetTrainer = ({ params }) => {
  const query = useQuery({
    queryKey: [queryClientKeys.GET_INTERNAL_TRAINER, params],
    queryFn: () => trainerAdminService.getList({ params }),
  });

  return query;
};
