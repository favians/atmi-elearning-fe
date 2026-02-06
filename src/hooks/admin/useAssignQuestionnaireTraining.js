import { useMutation } from "@tanstack/react-query";
import { questionnaireAdminService } from "@/services/admin/questionnaireAdminService";

const useAssignQuestionnaireTraining = () => {
  const mutation = useMutation({
    mutationFn: questionnaireAdminService.assignQuestionnaire,
  });

  return mutation;
};

export default useAssignQuestionnaireTraining;
