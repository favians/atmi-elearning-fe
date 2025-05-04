import { useQuery } from "@tanstack/react-query";
import { queryClientKeys } from "@/constants/query-client-keys";
import { certificateTraineeService } from "@/services/trainee/certificateTraineeService";

export const useGetCertificate = ({ params }) => {
  const query = useQuery({
    queryKey: [queryClientKeys.GET_TRAINEE_CERTIFICATE, params],
    queryFn: () => certificateTraineeService.getList({ params }),
  });

  return query;
};
