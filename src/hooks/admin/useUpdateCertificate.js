import { useMutation } from "@tanstack/react-query";
import { certificateAdminService } from "@/services/admin/certificateAdminService";

const useUpdateCertificate = () => {
  const mutation = useMutation({
    mutationFn: certificateAdminService.updateCertificate,
  });

  return mutation;
};

export default useUpdateCertificate;
