"use client";
import InputForm from "@/components/form/input-form";
import { subtitle } from "@/components/primitives";
import { Button } from "@heroui/button";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { loginSchema } from "./validation/schema";
import InputPasswordForm from "@/components/form/input-password-form";
import useSignIn from "@/hooks/auth/useSignIn";

export default function LoginForm() {
  const { mutate, isPending } = useSignIn();

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
        Log in ke akunmu
      </h3>
      <h4 className={subtitle({ color: "grey", size: "sm" })}>
        Masukkan username dan password untuk sign in di platform pembelajaran
        ATMI
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
          placeholder="Masukkan username Anda"
          name="password"
          control={control}
          required
        />
        <Button size="lg" color="primary" isLoading={isPending} type="submit">
          Masuk
        </Button>
      </form>
    </div>
  );
}
