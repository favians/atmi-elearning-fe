import logoWhite from "@/assets/images/logo/logo_white.png";
import { subtitle, title } from "@/components/primitives";
import shapeCircle from "@/assets/images/illustration/shape_circle.png";
import Image from "next/image";
import LoginForm from "@/components/pages/login/login-form";
import { Link } from "@heroui/link";

export default function LoginPage() {
  return (
    <div className="grid h-screen grid-cols-3 max-[667px]:grid-cols-1">
      <div className="col-span-2 flex flex-col bg-gradient-to-bl from-[#05AAE6] to-[#003452] p-4 max-[667px]:hidden">
        <Link href="/">
          <Image
            src={logoWhite}
            alt="Logo White"
            height={40}
            className="mr-10 object-cover"
          />
        </Link>
        <div className="flex  flex-col  flex-1 justify-center w-3/4 mx-auto">
          <h3 className={title({ color: "white", class: "mb-4" })}>
            Selamat Datang di <br />
            E-learning ATMI
          </h3>
          <h4 className={subtitle({ color: "white", class: "mb-8" })}>
            Login untuk mulai kelasmu dan dapatkan materi dari <br />
            expert di bidangnya
          </h4>
        </div>
        <Image
          src={shapeCircle}
          alt="Shape Circle Image"
          width={280}
          className="object-cover absolute left-0 bottom-0"
        />
      </div>
      <div className="col-span-1 flex flex-col justify-center max-w-[360px] mx-auto max-[667px]:w-full max-[667px]:max-w-none max-[667px]:px-6 max-[667px]:bg-gradient-to-bl max-[667px]:from-[#05AAE6] max-[667px]:to-[#003452]">
        <div className="hidden max-[667px]:flex max-[667px]:flex-col max-[667px]:mb-8">
          <Link href="/" className="mb-8">
            <Image
              src={logoWhite}
              alt="Logo White"
              height={40}
              className="object-cover"
            />
          </Link>
          <h3 className={title({ color: "white", class: "mb-3" })}>
            Selamat Datang di
            <br />
            E-learning ATMI
          </h3>
          <h4 className={subtitle({ color: "white" })}>
            Login untuk mulai kelasmu dan dapatkan materi dari expert di
            bidangnya
          </h4>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
