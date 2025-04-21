import { useQuery } from "@tanstack/react-query";
import { queryClientKeys } from "@/constants/query-client-keys";
import { traineeAdminService } from "@/services/admin/traineeAdminService";

export const useGetTrainee = ({ params }) => {
  const query = useQuery({
    queryKey: [queryClientKeys.GET_INTERNAL_TRAINEE, params],
    queryFn: () => traineeAdminService.getList({ params }),
  });

  return query;
};
