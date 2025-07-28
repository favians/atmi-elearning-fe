import { subtitle, title } from "@/components/primitives";
import shapeCircle from "@/assets/images/illustration/shape_circle.png";
import Image from "next/image";
import { Link } from "@heroui/link";
import LoginAdmin from "@/components/pages/login/login-admin";
import logoWhite from "@/assets/images/logo/logo_white.png";

export default function LoginPage() {
  return (
    <div className="grid grid-cols-3 h-screen">
      <div className="col-span-2 flex flex-col bg-gradient-to-bl  from-[#05AAE6]  to-[#003452] p-4 ">
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
            Login di <br />
            Admin E-learning ATMI
          </h3>
          <h4 className={subtitle({ color: "white", class: "mb-8" })}>
            Masuk untuk mengelola kelas dan materi <br />
            dengan mudah dan efisien
          </h4>
        </div>
        <Image
          src={shapeCircle}
          alt="Shape Circle Image"
          width={280}
          className="object-cover absolute left-0 bottom-0"
        />
      </div>
      <div className="col-span-1 flex flex-col justify-center max-w-[360px] mx-auto">
        <LoginAdmin />
      </div>
    </div>
  );
}
