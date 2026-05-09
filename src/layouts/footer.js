"use client";
import React from "react";
import Section from "./section";
import { headline, subteks, subtitle } from "@/components/primitives";
import {
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  YoutubeIcon,
} from "@/components/icons";
import { Button } from "@heroui/button";
import { useForm } from "react-hook-form";
import Image from "next/image";

import logoWhite from "@/assets/images/logo/logo_white.png";

const info = [
  { title: "ATMI BizDec", link: "/home" },
  { title: "Registrasi Training", link: "/producs" },
  { title: "Services", link: "/services" },
];

const about = [
  { title: "Tentang E-learning ATMI", link: "/about" },
  { title: "Kontak kami", link: "/" },
  {
    title: "Experience",
    link: "/",
  },
];
export default function Footer() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      username: "",
    },
  });

  const onSubmit = (data) => console.log(data);
  return (
    <footer>
      <Section
        className="bg-[#22242A]"
        wrapperClass="grid grid-cols-5 p-16 gap-24 max-[667px]:flex max-[667px]:flex-col max-[667px]:gap-10 max-[667px]:px-6 max-[667px]:py-12"
      >
        <div className="col-span-2 max-h-fit bg-[#17181C] rounded-xl p-6 max-[667px]:w-full">
          <h3
            className={headline({
              color: "white",
              class: "font-normal",
              size: "lg",
            })}
          >
            <span className="opacity-50 mr-2">
              Belum menemukan kelas yang cocok?
            </span>
            <span>Tanya tim kami untuk lebih detail</span>
          </h3>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-4 gap-4  dark flex flex-col"
          >
            <Button
              radius="full"
              className="bg-primary mb-4 max-w-44 text-white"
              type="submit"
              onPress={() =>
                window.open("https://wa.me/6281336707074", "_blank")
              }
            >
              Tanya CS
            </Button>
          </form>
        </div>
        <div className="col-span-3 text-white">
          <div className="grid grid-cols-3 max-[667px]:grid-cols-1 max-[667px]:gap-10">
            <div className="text-white">
              <div className="footer-info mb-16 max-[667px]:mb-0">
                <h4
                  className={subteks({
                    color: "primary",
                    class: "mb-4",
                  })}
                >
                  INFO
                </h4>
                {info.map((item) => {
                  return (
                    <a
                      href={item.link}
                      key={item.title}
                      className={subtitle({
                        color: "white",
                        class: "block mb-2 font-normal",
                        size: "sm",
                      })}
                    >
                      {item?.title}
                    </a>
                  );
                })}
              </div>
            </div>
            <div className="text-white">
              <div className="footer-info mb-16 max-[667px]:mb-0">
                <h4
                  className={subteks({
                    color: "primary",
                    class: "mb-4",
                  })}
                >
                  ABOUT US
                </h4>
                {about.map((item) => {
                  return (
                    <a
                      href={item.link}
                      key={item.title}
                      className={subtitle({
                        color: "white",
                        class: "block mb-2 font-normal",
                        size: "sm",
                      })}
                    >
                      {item?.title}
                    </a>
                  );
                })}
              </div>
            </div>
            <div className="text-white">
              <div className="footer-contact mb-16 max-[667px]:mb-0">
                <h4
                  className={subteks({
                    color: "primary",
                    class: "mb-4",
                  })}
                >
                  CONTACT US
                </h4>
                <h4
                  className={subtitle({
                    color: "white",
                    class: "block mb-2 font-normal leading-6",
                    size: "sm",
                  })}
                >
                  Telepon: (0271) 746 2535
                  <br />
                  E-mail: marketing@atmibizdec.id
                  <br />
                  Jl. Adisucipto Km. 9.5, Blulukan, Colomadu, Surakarta, Central
                  Java, Indonesia.
                </h4>
              </div>
            </div>
          </div>

          <div className="text-white mt-10 max-[667px]:mt-0">
            <Image
              src={logoWhite}
              alt="Logo White"
              height={80}
              className="mr-10 object-cover max-[667px]:mr-0 max-[667px]:w-auto max-[667px]:h-12"
            />
          </div>

          <div className="footer-social flex gap-2 text-white mt-8 max-[667px]:mt-6 max-[667px]:flex-wrap">
            <Button
              isIconOnly
              size="lg"
              variant="light"
              className="border-1 border-grey-900  text-white p-3 rounded-full"
            >
              <FacebookIcon size={16} />
            </Button>
            <Button
              isIconOnly
              size="lg"
              variant="light"
              className="border-1 border-grey-900  text-white p-3 rounded-full"
            >
              <InstagramIcon size={16} />
            </Button>

            <Button
              isIconOnly
              size="lg"
              variant="light"
              className="border-1 border-grey-900  text-white p-3 rounded-full"
            >
              <YoutubeIcon size={16} />
            </Button>

            <Button
              isIconOnly
              size="lg"
              variant="light"
              className="border-1 border-grey-900  text-white p-3 rounded-full"
            >
              <TwitterIcon size={16} />
            </Button>
            <div className="flex flex-1 justify-end items-end text-xs text-gray-500 max-[667px]:w-full max-[667px]:justify-start max-[667px]:pt-4">
              © 2025 — Copyright All right reserved PT ATMI BizDec
            </div>
          </div>
        </div>
      </Section>
    </footer>
  );
}
