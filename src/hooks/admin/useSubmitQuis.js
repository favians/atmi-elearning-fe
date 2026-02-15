import { useMutation } from "@tanstack/react-query";
import { trainingAdminService } from "@/services/admin/trainingAdminService";

const useSubmitQuis = () => {
  const mutation = useMutation({
    mutationFn: trainingAdminService.submitQuis,
  });

  return mutation;
};

export default useSubmitQuis;
