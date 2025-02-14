"use client";

import { NewsLetter } from "@/components/NewsLetter";
import { Button } from "@/components/ui/button";
import { Input } from "@/lib/utils/Input";
import Link from "next/link";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { BsTelephoneFill, BsYoutube } from "react-icons/bs";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { MdArrowForwardIos, MdLocationOn, MdMail } from "react-icons/md";
import { IoPaperPlane } from "react-icons/io5";

interface pageProps {}

const ContactPage: FC<pageProps> = ({}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitForm = () => {
    console.log("form");
  };
  return (
    <main className="">
      <section className="flex px-6 py-4 gap-2 lg:px-32  justify-start items-center">
        <span className="text-lg font-semibold">Home</span>
        <MdArrowForwardIos className="text-[#999999] text-xs" />
        <span>Contact Us</span>
      </section>
      <div className=" bg-white pt-8 px-6 md:px-16 pb-16 lg:pb-32">
        <h2 className="text-2xl sm:ml-16 sm:text-3xl lg:mb-12 lg:text-4xl tracking-wider mb-6 font-extrabold text-[#0C0E3B]">
          Contact <span className="text-[#00AEEF] tracking-wider">Us</span>
        </h2>
        {/* contact */}
        <section className="max-w-[26rem] mx-auto w-full md:max-w-[75%] lg:max-w-[65%]">
          <h5 className="font-semibold mb-3 lg:mb-6 lg:text-2xl text-start">
            Leave us a message
          </h5>
          <div className="flex flex-col gap-y-10 gap-x-6 md:flex-row md:mx-auto">
            <form
              onSubmit={handleSubmit(submitForm)}
              className="flex flex-col gap-3 w-full max-w-[26rem] mx-auto"
            >
              <Input
                label="Name"
                id="name"
                type="text"
                register={register}
                placeholder="Enter your full name"
                errors={errors}
                className="px-2.5 py-1.5 lg:py-3"
              />
              <Input
                label="Email"
                id="email"
                type="email"
                register={register}
                placeholder="Enter your email"
                errors={errors}
                className="px-2.5 py-1.5 lg:py-3"
              />
              <Input
                label="Subject"
                id="subject"
                type="text"
                register={register}
                placeholder="Enter your subject"
                errors={errors}
                className="px-2.5 py-1.5 lg:py-3"
              />
              <fieldset className="">
                <h3 className="text-sm font-semibold text-gray-950 leading-6">
                  Message
                </h3>
                <textarea
                  rows={5}
                  style={{ resize: "none" }}
                  className="p-3 w-full mt-1 border-[1px] border-slate-300 rounded-md"
                  placeholder="Enter your message"
                />
              </fieldset>
              <Button
                variant={"primary"}
                type='button'
                className="rounded-md gap-4 lg:h-12 w-full max-w-[60%] py-3 mx-auto"
              >
                {" "}
                <IoPaperPlane className="text-xl md:text-2xl" />
                Send Message
              </Button>
            </form>

            <div className="flex flex-col gap-7 md:mt-6 ">
              <div className="flex gap-2 justify-start items-start">
                <MdLocationOn size={25} />
                <p className="text-[#0C0E3B] text-[0.9rem] leading-5 font-semibold max-w-[20rem]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit
                </p>
              </div>
              <div className="flex gap-2 justify-start items-start">
                <BsTelephoneFill size={20} />
                <p className="text-[#0C0E3B] text-[0,9rem] leading-5 font-semibold max-w-[20rem]">
                  +234 081-1236-4568
                </p>
              </div>
              <div className="flex gap-2 justify-start items-start">
                <MdMail size={23} />
                <p className="text-[#0C0E3B] text-[0,9rem] leading-5 font-semibold max-w-[20rem]">
                  support@afruna.com
                </p>
              </div>
              <div className="flex gap-3 justify-center items-center w-fit">
                <Link href={"/"} className="hover:scale-90 text-[#0C0E3B]">
                  <BsYoutube size={25} />
                </Link>
                <Link
                  href={"/"}
                  className="hover:scale-90 transition duration-300 text-[#0C0E3B]"
                >
                  <FaInstagram size={20} />
                </Link>
                <Link
                  href={"/"}
                  className="hover:scale-90 transition duration-300 text-[#0C0E3B]"
                >
                  <FaFacebookF size={18} />
                </Link>
                <Link
                  href={"/"}
                  className="hover:scale-90 transition duration-300 text-[#0C0E3B]"
                >
                  <FaTwitter size={21} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ContactPage
