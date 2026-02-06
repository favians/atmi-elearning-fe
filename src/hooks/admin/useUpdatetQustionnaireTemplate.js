import { useMutation } from "@tanstack/react-query";
import { questionnaireAdminService } from "@/services/admin/questionnaireAdminService";

const useUpdatetQustionnaireTemplate = () => {
  const mutation = useMutation({
    mutationFn: questionnaireAdminService.updateQuestionnaire,
  });

  return mutation;
};

export default useUpdatetQustionnaireTemplate;
