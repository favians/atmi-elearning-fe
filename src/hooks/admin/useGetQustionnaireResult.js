import { useQuery } from "@tanstack/react-query";
import { queryClientKeys } from "@/constants/query-client-keys";
import { questionnaireAdminService } from "@/services/admin/questionnaireAdminService";

export const useGetQustionnaireResult = ({ params }) => {
  const query = useQuery({
    queryKey: [queryClientKeys.GET_QUESTIONNAIRE_RESULT_LIST, params],
    queryFn: () => questionnaireAdminService.getListResult({ params }),
  });

  return query;
};
