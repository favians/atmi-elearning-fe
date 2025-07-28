import { useMutation } from "@tanstack/react-query";
import { trainingTraineeService } from "@/services/trainee/trainingTraineeService";

const useUpdateProgress = () => {
  const mutation = useMutation({
    mutationFn: trainingTraineeService.updateProgress,
  });

  return mutation;
};

export default useUpdateProgress;
