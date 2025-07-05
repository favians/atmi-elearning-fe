import { useMutation } from "@tanstack/react-query";
import { traineeAdminService } from "@/services/admin/traineeAdminService";

const useUpdateTrainee = () => {
  const mutation = useMutation({
    mutationFn: traineeAdminService.updateTrainee,
  });

  return mutation;
};

export default useUpdateTrainee;
