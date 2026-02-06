import { useQuery } from "@tanstack/react-query";
import { queryClientKeys } from "@/constants/query-client-keys";
import { questionnaireAdminService } from "@/services/admin/questionnaireAdminService";

export const useGetQustionnaireTemplate = ({ params }) => {
  const query = useQuery({
    queryKey: [queryClientKeys.GET_QUESTIONNAIRE_LIST, params],
    queryFn: () => questionnaireAdminService.getList({ params }),
  });

  return query;
};
