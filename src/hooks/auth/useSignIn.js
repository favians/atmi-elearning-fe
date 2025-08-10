import { useMutation } from "@tanstack/react-query";
import { setCookie } from "cookies-next";
import { storageKeys } from "@/constants/storage-keys";
import { useRouter } from "next/navigation";
import { routeNames } from "@/constants/route-names";
import toast from "react-hot-toast";
import { authService } from "@/services/authService";

const useSignIn = () => {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: authService.signIn,
    onSuccess: (data) => {
      setCookie(storageKeys.AUTH_TOKEN, data?.data?.token);

      setCookie(storageKeys.ROLE, "USER");
      router.replace(routeNames.DASHBOARD_USER);
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });

  return mutation;
};

export default useSignIn;
