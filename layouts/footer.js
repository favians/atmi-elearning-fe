import React from "react";
import Section from "./section";
import { headline, subteks, subtitle } from "@/components/primitives";
import { Input } from "@heroui/input";
import {
  FacebookIcon,
  InstagramIcon,
  LogoWhite,
  TwitterIcon,
  YoutubeIcon,
} from "@/components/icons";
import { Button } from "@heroui/button";
import { useForm } from "react-hook-form";
import InputForm from "@/components/form/input-form";

const info = [
  { title: "Company", link: "/company" },
  { title: "Products", link: "/producs" },
  { title: "Engineering", link: "/engineering" },
  { title: "Services", link: "/services" },
  { title: "Productions", link: "/productions" },
];

const about = [
  { title: "Gallery", link: "/about" },
  { title: "Technologies", link: "/tech" },
  { title: "Contacts", link: "/contacts" },
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
        wrapperClass="grid grid-cols-5 p-16 gap-24"
      >
        <div className="col-span-2 bg-[#17181C] rounded-xl p-6">
          <h4
            className={subteks({
              color: "orange",
              class: "mb-4",
            })}
          >
            FEEDBACK
          </h4>
          <h3
            className={headline({
              color: "white",
              class: "font-normal",
            })}
          >
            <span className="opacity-50 mr-2">
              Seeking personalized support?
            </span>
            <span>Request a call from our team</span>
          </h3>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-4 gap-4  dark flex flex-col"
          >
            <InputForm
              label="YOUR NAME"
              placeholder="Masukkan nama Anda"
              name="name"
              isDark
              control={control}
            />
            <InputForm
              label="PHONE NUMBER"
              placeholder="Masukkan nomer handphone Anda"
              name="phone"
              isDark
              control={control}
            />
            <Button
              radius="full"
              className="bg-orange-bricks max-w-44 text-white"
              type="submit"
            >
              Send a request
            </Button>
          </form>
        </div>
        <div className="col-span-3">
          <div className=" grid grid-cols-3">
            <div className="text-white">
              <div className="footer-info mb-16">
                <h4
                  className={subteks({
                    color: "orange",
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

              <div className="footer-contact mb-16">
                <h4
                  className={subteks({
                    color: "orange",
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
                  +1 (999) 999-99-99
                  <br />
                  hello@logoipsum.com
                  <br />
                  London
                </h4>
              </div>
            </div>
            <div className="text-white">
              <div className="footer-info mb-16">
                <h4
                  className={subteks({
                    color: "orange",
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
              <LogoWhite size={100} />
            </div>
          </div>
          <div className="footer-subs mb-16">
            <h4
              className={subteks({
                color: "orange",
                class: "mb-4",
              })}
            >
              Subscription
            </h4>
            <Input
              placeholder="E-mail"
              radius="sm"
              classNames={{
                inputWrapper: "bg-transparent border-1 border-grey-900",
              }}
            />
          </div>
          <div className="footer-social flex gap-2 text-white">
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
            <div className="flex flex-1 justify-end items-end text-xs text-gray-500">
              © 2023 — Copyright
            </div>
          </div>
        </div>
      </Section>
    </footer>
  );
}
