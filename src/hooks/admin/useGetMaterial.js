import { useQuery } from "@tanstack/react-query";
import { queryClientKeys } from "@/constants/query-client-keys";
import { materialAdminService } from "@/services/admin/materialAdminService";

export const useGetMaterial = ({ params }) => {
  const query = useQuery({
    queryKey: [queryClientKeys.GET_INTERNAL_MATERIAL, params],
    queryFn: () => materialAdminService.getList({ params }),
  });

  return query;
};
