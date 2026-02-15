// hooks/admin/deleteTemplateQuestionnaire.js
import { questionnaireAdminService } from "@/services/admin/questionnaireAdminService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function deleteTemplateQuestionnaire() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => questionnaireAdminService.deleteTemplate(id),

    onSuccess: () => {
      toast.success("Template kuesioner berhasil dihapus");

      queryClient.invalidateQueries({
        queryKey: ["questionnaire-template"],
      });
    },

    onError: (error) => {
      const message =
        error?.response?.data?.message || "Gagal menghapus template kuesioner";

      toast.error(message);
    },
  });
}
