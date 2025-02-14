import { imgs } from "@/constants/images";
import Image, { StaticImageData } from "next/image";
import { FC } from "react";
import { HiLocationMarker, HiOutlineSearch, HiSearch } from "react-icons/hi";
import { Button } from "./ui/button";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { afrunaPartner, providers, services } from "@/constants/data";
import SearchComponent from "./searchComponent";
import Link from "next/link";

interface LandingbannarProps {}

const Landingbannar: FC<LandingbannarProps> = ({}) => {
  return (
    <section className="">
      <div className="relative h-[15rem] lg:h-[33rem] w-full flex flex-col justify-center items-center">
        <div className=" absolute left-3 lg:left-44 top-[1.5rem] lg:[4rem] flex justify-center items-center">
          <div className="w-[4rem] h-[4rem] lg:w-[9rem] lg:h-[9rem] overflow-hidden relative">
            <Image
              src={imgs.hero1}
              alt="logo"
              priority
              className="object-contain"
            />
          </div>
        </div>
        <div className="absolute left-0 top-[11.5rem] lg:top-[16rem] flex justify-center items-center">
          <div className="w-[4rem] h-[4rem] lg:w-[10rem] lg:h-[10rem] overflow-hidden relative">
            <Image
              src={imgs.hero3}
              alt="logo"
              priority
              fill
              className="object-contain"
            />
          </div>
        </div>
        <div className="absolute right-3 lg:right-48 top-[2rem] lg:top-[3rem] flex justify-center items-center">
          <div className="w-[4rem] h-[4rem] lg:w-[10rem] lg:h-[10rem] overflow-hidden relative">
            <Image
              src={imgs.hero2}
              alt="logo"
              priority
              fill
              className="object-contain"
            />
          </div>
        </div>
        <div className="absolute z-20 right-5 lg:right-20 top-[11rem] lg:top-[16rem] flex justify-center items-center">
          <div className="w-[4rem] h-[4rem] lg:w-[10rem] lg:h-[10rem] overflow-hidden relative">
            <Image
              src={imgs.hero4}
              alt="logo"
              priority
              fill
              className="object-contain"
            />
          </div>
        </div>
        <div className=" hidden lg:absolute lg:right-[25rem] lg:bottom-0 lg:flex justify-center items-center">
          <div className=" lg:w-[8rem] lg:h-[6rem] overflow-hidden relative">
            <Image
              src={imgs.bannerCoil}
              alt="logo"
              priority
              fill
              className="object-contain"
            />
          </div>
        </div>
        <div className="hidden lg:absolute lg:right-0 lg:bottom-0 lg:flex justify-center items-center">
          <div className="w-[10rem] h-[10rem]  overflow-hidden relative">
            <Image
              src={imgs.bannerDot}
              alt="logo"
              priority
              fill
              className="object-contain"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 lg:gap-4 lg:text-5xl lg:font-extrabold text-afruna-blue font-bold text-3xl justify-center items-center text-center">
          <span>Hire Experts</span>
          <div className="flex flex-col gap-2 lg:flex-row">
            <span>And get the work</span>
            <span className="block">done</span>
          </div>
        </div>
        <div className="hidden w-full max-w-[53%] md:flex gap-2 p-2 items-center justify-center text-xs font-medium shadow shadow-orange-100 mt-16 rounded-lg border border-[#BBBBBB]">
          <div className="border-r gap-5 flex items-center justify-center border-aruna-blue px-2 h-full">
            <HiOutlineSearch className="text-primaryGreen" size={25} />
            <span>What are you looking for?</span>
          </div>
          <div className="flex gap-2 px-2 items-center justify-center pr-10  border-r border-aruna-blue h-full">
            <HiLocationMarker className="text-primaryGreen text-2xl" /> Country
          </div>
          <div className="flex gap-2 items-center justify-center border-r pr-10 border-aruna-blue px-2 h-full">
            <HiLocationMarker className="text-primaryGreen text-2xl" /> State of
            Province
          </div>

          <Link href={"/around-me"} className="flex gap-5 items-center ">
          <HiLocationMarker className="text-primaryGreen text-2xl" /> 

            Service Providers Around You?
          </Link>
        </div>
        <div className=" hidden lg:flex flex-col w-full mt-36 gap-2 max-w-[85%]">
          <h3 className=" text-neutral-500 text-xl">Our Partners</h3>
          <div className=" flex justify-start items-center gap-4">
            {afrunaPartner.map(({ img, _id }) => {
              return (
                <div key={_id} className="flex justify-center items-center">
                  <div className="w-[4rem] h-[1.5rem] overflow-hidden relative">
                    <Image
                      src={img}
                      alt="partner"
                      priority
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="lg:hidden flex flex-col text-xl shadow-lg shadow-primaryGreen px-2 mt-8 max-w-[90%] mx-auto rounded-lg border border-[#BBBBBB]">
        <div className="py-6 px-4 border-b border-aruna-blue">
          What are you looking for?
        </div>
        <div className="flex gap-3 items-center py-6 px-4 border-b border-aruna-blue">
          <HiLocationMarker className="text-primaryGreen text-3xl" /> Country
        </div>
        <div className="flex gap-3 items-center py-6 px-4 border-b border-aruna-blue">
          <HiLocationMarker className="text-primaryGreen text-3xl" /> State of
          Province
        </div>
        <div className="flex gap-3 items-center p-4">
          <Button variant={"primary"} className="w-full h-12 rounded-xl">
            Search Now <MdOutlineKeyboardArrowRight className="text-2xl " />
          </Button>
        </div>
      </div>
      <div className=" lg:hidden flex flex-col gap-2 max-w-[90%] mt-8 mx-auto">
        <h3 className=" text-neutral-500 text-xl">Our Partners</h3>
        <div className=" flex justify-start items-center gap-4">
          {afrunaPartner.map(({ img, _id }) => {
            return (
              <div key={_id} className="flex justify-center items-center">
                <div className="w-[4rem] h-[1.5rem] overflow-hidden relative">
                  <Image
                    src={img}
                    alt="partner"
                    priority
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Landingbannar;
