import { useMutation } from "@tanstack/react-query";
import { traineeAdminService } from "@/services/admin/traineeAdminService";

const useCreateTrainee = () => {
  const mutation = useMutation({
    mutationFn: traineeAdminService.createTrainee,
  });

  return mutation;
};

export default useCreateTrainee;
