import { useQuery } from "@tanstack/react-query";
import { queryClientKeys } from "@/constants/query-client-keys";
import { trainingAdminService } from "@/services/admin/trainingAdminService";

export const useGetTopicList = () => {
  const query = useQuery({
    queryKey: [queryClientKeys.GET_TOPIC_LIST],
    queryFn: () => trainingAdminService.getTopicList(),
  });

  return query;
};
