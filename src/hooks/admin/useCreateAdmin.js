import { useMutation } from "@tanstack/react-query";
import { adminService } from "@/services/admin/adminService";

const useCreateAdmin = () => {
  const mutation = useMutation({
    mutationFn: adminService.createAdmin,
  });

  return mutation;
};

export default useCreateAdmin;
