import { useQuery } from "@tanstack/react-query";
import { queryClientKeys } from "@/constants/query-client-keys";
import { trainingAdminService } from "@/services/admin/trainingAdminService";

export const useGetBadgeList = () => {
  const query = useQuery({
    queryKey: [queryClientKeys.GET_BADGE_LIST],
    queryFn: () => trainingAdminService.getBadgeList(),
  });

  return query;
};
