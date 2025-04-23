import { useMutation } from "@tanstack/react-query";
import { certificateAdminService } from "@/services/admin/certificateAdminService";

const useCreateCertificate = () => {
  const mutation = useMutation({
    mutationFn: certificateAdminService.createCertificate,
  });

  return mutation;
};

export default useCreateCertificate;
