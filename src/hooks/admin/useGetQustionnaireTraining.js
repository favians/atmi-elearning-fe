import { useQuery } from "@tanstack/react-query";
import { queryClientKeys } from "@/constants/query-client-keys";
import { questionnaireAdminService } from "@/services/admin/questionnaireAdminService";

export const useGetQustionnaireTraining = ({ params }) => {
  const query = useQuery({
    queryKey: [queryClientKeys.GET_QUESTIONNAIRE_TRAINING_LIST, params],
    queryFn: () => questionnaireAdminService.getListTraining({ params }),
  });

  return query;
};
