import { useMutation } from "@tanstack/react-query";
import { questionnaireAdminService } from "@/services/admin/questionnaireAdminService";

const useDownloadCSV = () => {
  const mutation = useMutation({
    mutationFn: questionnaireAdminService.downloadCSV,
  });

  return mutation;
};

export default useDownloadCSV;
