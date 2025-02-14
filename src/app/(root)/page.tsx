"use client";
import CategoryCard from "@/components/CategoryCard";
import Landingbannar from "@/components/Landingbannar";
import { NewsLetter } from "@/components/NewsLetter";
import { ProviderCard } from "@/components/ProviderCard";
import ServicesCard from "@/components/ServicesCard";
import TestimonialSlider from "@/components/TestimonialSlider";
import SearchBar from "@/components/searchComponent";
import NoThingFound from "@/components/ui/NothingFound";
import { Button, buttonVariants } from "@/components/ui/button";
import { userMethods, providers, services, providerMethods } from "@/constants/data";
import { imgs } from "@/constants/images";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaLessThanEqual } from "react-icons/fa";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

export default function Home() {
  const [instructions, setInstructions] = useState(false);
  return (
    <main className="flex flex-col">
      <Landingbannar />
      <SearchBar />

      {/* black friday section */}
      <section className="pt-10 pb-4 lg:pb-0 lg:pt-0">
        <div className="flex flex-col lg:flex-row max-w-[93%] lg:max-w-full lg:w-full mx-auto">
          <div className="relative flex justify-center items-center h-[15rem] lg:h-[22rem] w-full">
            <div className="w-full h-full overflow-hidden relative flex justify-center items-center">
              <Image src={imgs.blackFriday1} alt="partner" priority fill />
            </div>
            <Button
              variant={"whiteButton"}
              className="absolute bottom-0 right-0"
            >
              Discover
            </Button>
          </div>
          <div className="relative flex justify-center items-center h-[15rem] lg:h-[22rem] w-full">
            <div className="w-full h-full overflow-hidden relative">
              <Image src={imgs.blackFriday2} alt="partner" priority fill />
            </div>
            <Button className="absolute bottom-0 right-0">Discover</Button>
          </div>
        </div>
      </section>
      {/* featured categories section */}
      <section className="mt-10 lg:mt-16 lg:px-20 flex flex-col gap-2 lg:gap-4 max-w-[90%] w-full mx-auto pb-8 lg:pb-0">
        <h3 className=" text-primaryGreen text">CATEGORIES</h3>
        <h1 className="flex text-2xl md:text-3xl font-extrabold text-afruna-blue">
          Featured Categories
        </h1>
        <p className="text-afruna-gray md:mt-2">What services do you need?</p>
        {/* <div className="flex flex-row flex-wrap sm:justify-center gap-6 md:gap-8 mt-8 lg:mt-10 ">
          {isSuccess &&
            data?.data.map((item) => {
              return <CategoryCard key={item._id} item={item} />;
            })}
        </div> */}
        <div className="my-4 md:flex justify-end">
          <Link
            href={"/categories"}
            className={buttonVariants({ variant: "link" })}
          >
            {" "}
            Explore more categories{" "}
            <MdOutlineKeyboardDoubleArrowRight className="text-2xl ml-2" />
          </Link>
        </div>
      </section>
      {/* operate section */}
      <section className="mt-10 relative lg:mt-16 px-6 pt-10 lg:pt-16 lg:px-[9.5rem] flex flex-col gap-2 lg:gap-4 bg-[#F1F5F9] w-full pb-8 lg:pb-24">
        <h3 className=" text-primaryGreen text-lg font-bold text">
          Help Buddy
        </h3>
        <h1 className="flex text-3xl font-extrabold text-afruna-blue">
          How it works
        </h1>
        <div>
          
          
            <div className="flex justify-start items-center lg:mt-2 max-w-[80%] lg:max-w-fit gap-1 bg-white rounded-full">
              <Button
                variant={`${instructions?"white":"primary"}`}
                className=" w-full rounded-full max-w-[8rem] lg:px-16"
                onClick={()=>setInstructions(false)}
              >
                Users
              </Button>
              <Button
              onClick={()=>setInstructions(true)}
              variant={`${instructions?"primary":"white"}`} className=" rounded-full">
                Service Provider
              </Button>
            </div>
    
        </div>
        <div className="flex flex-row flex-wrap sm:justify-center gap-6 mt-8 lg:mt-10">
          {instructions?providerMethods.map(({ text, title }) => {
            return (
              <div
                key={title}
                className="flex w-full flex-col sm:max-w-[10.5rem] lg:max-w-[21rem] text-center px-4 gap-4 font-semibold rounded-lg bg-white py-12 justify-center items-center"
              >
                <h2 className="font-extrabold">{title}</h2>
                <p className="text-sm text-afruna-blue">{text}</p>
              </div>
            );
          }):userMethods.map(({ text, title }) => {
            return (
              <div
                key={title}
                className="flex w-full flex-col sm:max-w-[10.5rem] lg:max-w-[21rem] text-center px-4 gap-4 font-semibold rounded-lg bg-white py-12 justify-center items-center"
              >
                <h2 className="font-extrabold">{title}</h2>
                <p className="text-sm text-afruna-blue">{text}</p>
              </div>
            );
          })}
        </div>
        <div className="md:hidden absolute top-[21rem] right-5 ">
          <div className="h-[5rem] w-[2.5rem] overflow-hidden relative flex justify-center items-center">
            <Image src={imgs.operate1} alt="operate" priority fill />
          </div>
        </div>
        <div className="md:hidden absolute bottom-[12.5rem] left-5  ">
          <div className="h-[5rem] w-[2rem] overflow-hidden relative flex justify-center items-center">
            <Image src={imgs.operate2} alt="operate" priority fill />
          </div>
        </div>
        <div className="hidden md:block absolute top-60 left-[25rem]  ">
          <div className="h-[4rem] w-[8rem] overflow-hidden relative flex justify-center items-center">
            <Image src={imgs.operate3} alt="operate" priority fill />
          </div>
        </div>
        <div className="hidden md:block absolute bottom-20 right-[25rem]  ">
          <div className="h-[4rem] w-[8rem] overflow-hidden relative flex justify-center items-center">
            <Image src={imgs.operate4} alt="operate" priority fill />
          </div>
        </div>
        <div className=" absolute right-0 bottom-0 flex justify-center items-center">
          <div className="w-[3rem] h-[7rem] overflow-hidden relative">
            <Image
              src={imgs.operateStroke}
              alt="logo"
              priority
              className="object-contain"
            />
          </div>
        </div>
      </section>
      {/* popular services section */}
      <section className="flex lg:pt-20 flex-col lg:px-[9.5rem] gap-2 px-4 pt-12 relative bg-[#FFFDFB] w-full  pb-16">
        <div className="flex flex-col gap-6 md:flex-row md:justify-between">
          <div className="flex flex-col gap-2">
            <h3 className=" text-primaryGreen text">SERVICES</h3>
            <h1 className="flex text-3xl font-extrabold text-afruna-blue">
              Popular Services
            </h1>
            <p className=" text-afruna-blue lg:mt-2">
              What services do you wants?
            </p>

          </div>
          <div className="flex justify-start items-center max-w-[80%] gap-1 bg-white rounded-full">
            <Link href={"/services"}>
              <Button
                variant={"yellowOutlineButton"}
                className=" w-full rounded-full max-w-[8rem]"
              >
                View All{""}
                <MdOutlineKeyboardDoubleArrowRight className="text-2xl ml-2" />
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 mt-8 ">
          {
            services?services.slice(0,4).map((item,index)=> <ServicesCard item={item} key={index} />): <NoThingFound />
          }
        </div>
      </section>
      {/* services provider section */}
      <section className="flex flex-col gap-2 px-4 lg:px-32 pt-12 relative bg-[#FFFDFB] w-full pb-16">
        <div className="flex flex-col gap-6 md:flex-row md:justify-between">
          <div className="flex flex-col gap-2">
            <h3 className=" text-primaryGreen text">The owners</h3>
            <h1 className="flex text-3xl font-extrabold text-afruna-blue">
              Services Provider
            </h1>
          </div>
          <div className="flex justify-start items-center max-w-[80%] gap-1 bg-white rounded-full">
            <Link
              href={"/providers"}
              className={buttonVariants({ variant: "link" })}
            >
              View All{" "}
              <MdOutlineKeyboardDoubleArrowRight className="text-2xl ml-2" />
            </Link>
            {/* // className=" w-full rounded-full max-w-[8rem]" */}
          </div>
        </div>
        <div className="flex flex-row flex-wrap sm:justify-center gap-6 mt-8 lg:mt-10">
          {providers?providers.slice(0,6).map((provider,index) => <ProviderCard key={index} item={provider} />):<NoThingFound />}
        </div>
      </section>
      {/* testimonial section */}
      <section className="flex flex-col gap-8 py-8 lg:pt-16 lg:pb-40 px-16">
        <div className="flex pl-16 flex-col justify-start items-start gap-4">
          <h4 className=" text-primaryGreen ">TESTMONIAL</h4>
          <h1 className=" text-afruna-blue text-2xl leading-3 font-bold">
            See why our users prefer us
          </h1>
        </div>
        {/* <div className="bg-[#FEE5CB] h-[10rem] w-full"> */}
        <TestimonialSlider />
        {/* </div> */}
      </section>
      {/* show case section */}
      <section className="py-8 lg:py-28 px-4 lg:px-40 ">
        {" "}
        <div className=" relative h-[38rem] lg:h-[23rem] flex flex-col justify-start lg:justify-center items-start gap-4 p-6 lg:p-16 bg-gradient-showcase rounded-2xl">
          <h2 className=" lg:max-w-[30rem] pt-12 lg:pt-0 w-full text-[1.6rem] text-white font-extrabold">
            Show case your Services on Help Buddy
          </h2>
          <p className="lg:text-xs text-white text-base ">
            What service do you need?
          </p>
          <div className="hidden md:flex justify-start">
            <Link
              href={"/authentication"}
              className=" text-white font-bold flex items-center bg-gradient-to-l from-primaryGreen to-afruna-blue rounded-full w-full h-12 px-12"
            >
              Join Now
            </Link>
          </div>
          <div className=" block md:hidden left-4 right-4 absolute bottom-8 z-10">
            <Button className=" text-sm font-bold text-whiteJoin bg-gradient-to-l from-primaryGreen  to-afruna-blue rounded-full w-full h-12 px-8">
              Join Now
            </Button>
          </div>
          <div className="absolute bottom-0 lg:-right-32">
            <div className="w-[18rem] h-[18rem] lg:w-[40rem] lg:h-[30rem] overflow-hidden relative flex justify-center items-center">
              <Image src={imgs.showcase} alt="showcase" priority fill />
            </div>
          </div>
        </div>
      </section>
      {/* Newsletter */}
      {/*   <NewsLetter /> */}
    </main>
  );
}
