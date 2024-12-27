import { LogoWhite } from "@/components/icons";
import { subtitle, title } from "@/components/primitives";
import shapeCircle from "@/assets/images/illustration/shape_circle.png";
import Image from "next/image";
import LoginForm from "@/components/pages/login/login-form";
import { Link } from "@nextui-org/link";

export default function LoginPage() {
  return (
    <div className="grid grid-cols-3 h-screen">
      <div className="col-span-2 flex flex-col bg-gradient-to-bl  from-[#05AAE6]  to-[#003452] p-4 ">
        <Link href="/">
          <LogoWhite size={90} />
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
      <div className="col-span-1 flex flex-col justify-center max-w-[360px] mx-auto">
        <LoginForm />
      </div>
    </div>
  );
}
