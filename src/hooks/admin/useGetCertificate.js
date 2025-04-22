import { useQuery } from "@tanstack/react-query";
import { queryClientKeys } from "@/constants/query-client-keys";
import { certificateAdminService } from "@/services/admin/certificateAdminService";

export const useGetCertificate = ({ params }) => {
  const query = useQuery({
    queryKey: [queryClientKeys.GET_INTERNAL_CERTIFICATE, params],
    queryFn: () => certificateAdminService.getList({ params }),
  });

  return query;
};
