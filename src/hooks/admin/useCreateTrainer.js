import { useMutation } from "@tanstack/react-query";
import { trainerAdminService } from "@/services/admin/trainerAdminService";

const useCreateTrainer = () => {
  const mutation = useMutation({
    mutationFn: trainerAdminService.createTrainee,
  });

  return mutation;
};

export default useCreateTrainer;
