import { useMutation } from "@tanstack/react-query";
import { trainerAdminService } from "@/services/admin/trainerAdminService";

const useCreateTrainer = () => {
  const mutation = useMutation({
    mutationFn: trainerAdminService.createTrainer,
  });

  return mutation;
};

export default useCreateTrainer;
