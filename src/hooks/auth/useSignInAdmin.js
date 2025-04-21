import { useMutation } from "@tanstack/react-query";
import { setCookie } from "cookies-next";
import { storageKeys } from "@/constants/storage-keys";
import { useRouter } from "next/navigation";
import { routeNames } from "@/constants/route-names";
import toast from "react-hot-toast";
import { authService } from "@/services/authService";

const useSignInAdmin = () => {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: authService.signInAdmin,
    onSuccess: (data) => {
      console.log(data);
      setCookie(storageKeys.AUTH_TOKEN, data?.data?.token);

      setCookie(storageKeys.ROLE, "ADMIN");
      router.replace(routeNames.DASHBOARD_ADMIN);
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });

  return mutation;
};

export default useSignInAdmin;
