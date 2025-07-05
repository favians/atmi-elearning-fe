import { useMutation } from "@tanstack/react-query";
import { adminService } from "@/services/admin/adminService";

const useUpdateAdmin = () => {
  const mutation = useMutation({
    mutationFn: adminService.updateAdmin,
  });

  return mutation;
};

export default useUpdateAdmin;
