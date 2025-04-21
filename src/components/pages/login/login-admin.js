"use client";
import InputForm from "@/components/form/input-form";
import { subtitle } from "@/components/primitives";
import { Button } from "@heroui/button";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { loginSchema } from "./validation/schema";
import InputPasswordForm from "@/components/form/input-password-form";
import useSignInAdmin from "@/hooks/auth/useSignInAdmin";

export default function LoginAdmin() {
  const { mutate, isPending } = useSignInAdmin();

  const { control, handleSubmit } = useForm({
    mode: "onChange",
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = (data) => {
    mutate({
      email: data.email,
      password: data.password,
    });
  };
  return (
    <div className="px-4">
      <h3 className={subtitle({ class: "font-semibold mb-2", size: "lg" })}>
        Sign in ke akun admin
      </h3>
      <h4 className={subtitle({ color: "grey", size: "sm" })}>
        Masukkan username dan password untuk sign in di platform admin ATMI
      </h4>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-4 gap-4 flex flex-col"
      >
        <InputForm
          label="Email"
          placeholder="Masukkan email Anda"
          name="email"
          type="email"
          control={control}
        />
        <InputPasswordForm
          label="Password"
          placeholder="Masukkan password Anda"
          name="password"
          control={control}
        />
        <Button size="lg" color="primary" isLoading={isPending} type="submit">
          Masuk
        </Button>
      </form>
    </div>
  );
}
