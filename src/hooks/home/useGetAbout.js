import { useQuery } from "@tanstack/react-query";
import { queryClientKeys } from "@/constants/query-client-keys";
import { aboutService } from "@/services/aboutService";

export const useGetAbout = () => {
  const query = useQuery({
    queryKey: [queryClientKeys.GET_ABOUT],
    queryFn: () => aboutService.getList(),
  });

  return query;
};
