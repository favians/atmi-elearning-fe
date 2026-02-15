import { useMutation } from "@tanstack/react-query";
import { aboutService } from "@/services/aboutService";

const useEditAboutProfile = () => {
  return useMutation({
    mutationFn: aboutService.updateProfile,
  });
};

export default useEditAboutProfile;
