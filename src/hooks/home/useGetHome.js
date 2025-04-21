import { useQuery } from "@tanstack/react-query";
import { queryClientKeys } from "@/constants/query-client-keys";
import { homeService } from "@/services/homeService";

export const useGetHome = () => {
  const query = useQuery({
    queryKey: [queryClientKeys.GET_HOME],
    queryFn: () => homeService.getList(),
  });

  return query;
};
