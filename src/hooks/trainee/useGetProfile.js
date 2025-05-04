import { useQuery } from "@tanstack/react-query";
import { queryClientKeys } from "@/constants/query-client-keys";
import { profileTraineeService } from "@/services/trainee/profileTraineeService";

export const useGetProfile = () => {
  const query = useQuery({
    queryKey: [queryClientKeys.GET_PROFILE],
    queryFn: () => profileTraineeService.getProfile(),
  });

  return query;
};
