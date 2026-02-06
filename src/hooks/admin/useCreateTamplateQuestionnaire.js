import { useMutation } from "@tanstack/react-query";
import { questionnaireAdminService } from "@/services/admin/questionnaireAdminService";

const useCreateTamplateQuestionnaire = () => {
  const mutation = useMutation({
    mutationFn: questionnaireAdminService.createQuestionnaire,
  });

  return mutation;
};

export default useCreateTamplateQuestionnaire;
