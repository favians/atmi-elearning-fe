import { useQuery } from "@tanstack/react-query";
import { queryClientKeys } from "@/constants/query-client-keys";
import { homeService } from "@/services/homeService";

export const useGetCategoryNavbar = () => {
  const query = useQuery({
    queryKey: [queryClientKeys.GET_CATEGORY_NAVBAR],
    queryFn: () => homeService.getCategoryNavbar(),
  });

  return query;
};
