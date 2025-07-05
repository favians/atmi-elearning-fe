import { useMutation } from "@tanstack/react-query";
import { trainingAdminService } from "@/services/admin/trainingAdminService";

const useCreateTraining = () => {
  const mutation = useMutation({
    mutationFn: trainingAdminService.createTraining,
  });

  return mutation;
};

export default useCreateTraining;
