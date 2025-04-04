"use client";
import InputForm from "@/components/form/input-form";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/button";
import toast from "react-hot-toast";
import InputPasswordForm from "@/components/form/input-password-form";
import { headline, subtitle } from "@/components/primitives";
import { Checkbox } from "@heroui/checkbox";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { FiMinus, FiPlus } from "react-icons/fi";
import { Divider } from "@heroui/divider";

export default function CreateAdminForm() {
  const router = useRouter();
  const { control, handleSubmit } = useForm({
    mode: "onChange",
  });
  const onSubmit = (data) => {
    toast.success("Sukses update");
  };

  const animals = [
    { key: "cat", label: "Cat" },
    { key: "dog", label: "Dog" },
    { key: "elephant", label: "Elephant" },
    { key: "lion", label: "Lion" },
  ];

  return (
    <div className="flex gap-2">
      <div className="p-6 w-1/2">
        <form onSubmit={handleSubmit(onSubmit)} className="gap-6 flex">
          <div className="flex flex-1 gap-4 flex-col">
            <InputForm
              label="Nama"
              placeholder="cth. Rizal Candra"
              name="name"
              control={control}
              labelPlacement="outside"
            />
            <InputForm
              label="Email"
              placeholder="cth. rizal.candra@gmail.com"
              name="email"
              type="email"
              control={control}
              labelPlacement="outside"
            />

            <InputForm
              label="Nomor Telepon"
              placeholder="cth. 0838344992211"
              name="phone"
              control={control}
              labelPlacement="outside"
            />

            <InputForm
              label="Label Admin"
              placeholder="cth. Admin"
              name="label"
              control={control}
              labelPlacement="outside"
            />

            <InputPasswordForm
              label="Password"
              placeholder="cth. qwerty123"
              name="password"
              control={control}
              labelPlacement="outside"
            />
            <div className="flex items-center mt-2 justify-end gap-2">
              <Button color="primary" variant="light">
                Batalkan
              </Button>
              <Button className="w-36" color="primary" type="submit">
                Simpan
              </Button>
            </div>
          </div>
        </form>
      </div>
      <div className="border-1 m-4 p-4 flex flex-1 flex-col rounded-lg border-gray-200 ">
        <h3 className={headline({ size: "sm" })}>Izin yang diberikan</h3>
        <h4 className={subtitle({ size: "sm" })}>
          Admin bisa melihat dan edit modul yang diizinkan
        </h4>

        <div className="flex items-center mt-4 mb-4 justify-between">
          <Checkbox defaultSelected>Pilih Semua</Checkbox>
          <h4
            className={subtitle({
              size: "sm",
              color: "primary",
              class: "cursor-pointer",
            })}
          >
            Hapus Semua
          </h4>
        </div>

        <Accordion
          itemClasses={{
            base: "-mx-2 mb-2",
            indicator: "!rotate-0",
            title: "font-semibold",
          }}
        >
          <AccordionItem
            key="1"
            aria-label="Accordion 1"
            title="Manajemen Materi"
            indicator={({ isOpen }) => (isOpen ? <FiMinus /> : <FiPlus />)}
          >
            <div className="grid grid-cols-2 gap-4">
              <Checkbox>Buat Materi Baru</Checkbox>
              <Checkbox>Edit Materi</Checkbox>
              <Checkbox>Hapus Materi</Checkbox>
              <Checkbox>Lihat Materi</Checkbox>
            </div>
          </AccordionItem>
        </Accordion>
        <Divider className="my-2" />
        <Accordion
          itemClasses={{
            base: "-mx-2 mb-2",
            indicator: "!rotate-0",
            title: "font-semibold",
          }}
        >
          <AccordionItem
            key="1"
            aria-label="Accordion 1"
            title="Manajemen User"
            indicator={({ isOpen }) => (isOpen ? <FiMinus /> : <FiPlus />)}
          >
            <div className="grid grid-cols-2 gap-4">
              <Checkbox>Verifikasi User</Checkbox>
              <Checkbox>Edit User</Checkbox>
              <Checkbox>Hapus User</Checkbox>
              <Checkbox>Lihat User</Checkbox>
            </div>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
