import { useMutation } from "@tanstack/react-query";
import { trainerAdminService } from "@/services/admin/trainerAdminService";

const useUpdateTrainer = () => {
  const mutation = useMutation({
    mutationFn: trainerAdminService.updateTrainer,
  });

  return mutation;
};

export default useUpdateTrainer;
