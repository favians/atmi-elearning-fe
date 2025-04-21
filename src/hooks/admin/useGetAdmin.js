import { useQuery } from "@tanstack/react-query";
import { queryClientKeys } from "@/constants/query-client-keys";
import { adminService } from "@/services/admin/adminService";

export const useGetAdmin = ({ params }) => {
  const query = useQuery({
    queryKey: [queryClientKeys.GET_INTERNAL_ADMIN, params],
    queryFn: () => adminService.getList({ params }),
  });

  return query;
};
