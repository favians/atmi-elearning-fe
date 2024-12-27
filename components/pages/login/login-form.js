import InputForm from "@/components/form/input-form";
import { subtitle } from "@/components/primitives";
import { Button } from "@nextui-org/button";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { loginSchema } from "./validation/schema";
import InputPasswordForm from "@/components/form/input-password-form";

export default function LoginForm() {
  const { control, handleSubmit } = useForm({
    mode: "onChange",
    resolver: yupResolver(loginSchema),
    defaultValues: {
      username: "",
    },
  });
  const onSubmit = (data) => console.log(data);
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
          label="Username"
          placeholder="Masukkan username Anda"
          name="username"
          control={control}
        />
        <InputPasswordForm
          label="Password"
          placeholder="Masukkan username Anda"
          name="password"
          control={control}
        />
        <Button size="lg" color="primary" type="submit">
          Masuk
        </Button>
      </form>
    </div>
  );
}
