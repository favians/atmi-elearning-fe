import { materialAdminService } from "@/services/admin/materialAdminService";
import { useMutation } from "@tanstack/react-query";

const useUpdateMaterial = () => {
  const mutation = useMutation({
    mutationFn: materialAdminService.update,
  });

  return mutation;
};

export default useUpdateMaterial;
