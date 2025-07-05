import { subtitle } from "@/components/primitives";
import { queryClientKeys } from "@/constants/query-client-keys";
import useUpdateAdmin from "@/hooks/admin/useUpdateAdmin";
import { Button } from "@heroui/button";
import { ModalBody } from "@heroui/modal";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";

export const ModalInactiveConfirmation = ({ item, onClose }) => {
  const { mutate, isPending: isLoadingEdit } = useUpdateAdmin();

  const queryClient = useQueryClient();
  const onSubmit = () => {
    const data = {
      id: item?.id,
      is_active: false,
    };
    mutate(data, {
      onSuccess: (res) => {
        onClose();
        toast.success(`Berhasil menonaktifkan ${item?.full_name}`);
        queryClient.invalidateQueries([queryClientKeys.GET_INTERNAL_ADMIN]);
      },
      onError: (error) => {
        toast.error(error?.message);
      },
    });
  };
  return (
    <ModalBody className="flex items-center gap-8 px-2">
      <h4 className={subtitle({ class: "font-semibold mt-4" })}>
        Nonaktifkan user
      </h4>
      <h4 className={subtitle({ class: "text-center" })}>
        Apakah Anda yakin ingin menonaktifkan user <br />
        <strong>{item?.full_name}</strong>?
      </h4>
      <div className="flex px-2 w-full flex-1 gap-2 mb-4">
        <Button
          onPress={onClose}
          className="w-full"
          fullWidth
          variant="bordered"
          color="primary"
        >
          Batal
        </Button>
        <Button
          isLoading={isLoadingEdit}
          className="w-full"
          fullWidth
          onPress={onSubmit}
          color="primary"
        >
          Yakin
        </Button>
      </div>
    </ModalBody>
  );
};
