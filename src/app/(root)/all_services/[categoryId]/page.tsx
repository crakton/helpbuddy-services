"use client";

import { AiFillAppstore } from "react-icons/ai";
import { BiMenu } from "react-icons/bi";
import { NewsLetter } from "@/components/NewsLetter";
import ServicesCard from "@/components/ServicesCard";
// import { ItemPicker } from "@/lib/utils/ItemPicker";
import { FC, useState } from "react";
import Image from "next/image";
import { imgs } from "@/constants/images";
import ItemPicker from "@/components/ItemPicker";
import { useGetServicesByCategoryIdQuery, useGetServicesByPageQuery } from "@/lib/redux/features/apis/services_api";
import NoServicesFound from "@/components/ui/NoServicesFound";
import { useGetCategoryByIdQuery } from "@/lib/redux/features/apis/categories_api";

interface pageProps {
  params: {
    categoryId:string
  }
}

const Page: FC<pageProps> = ({params: {categoryId}}) => {
  const [page, setPage] = useState(1);
  const { data } = useGetServicesByCategoryIdQuery(categoryId);
  const categoryRequest = useGetCategoryByIdQuery(categoryId);
  
  const services = data?.data;

  return (
    <main>
      {/* house bannar */}
      <section className=" relative w-full h-[15rem] sm:h-[19rem] ">
        <div className="absolute inset-0 sm:hidden ">
          <div className="w-full h-full overflow-hidden relative">
            <Image src={imgs.servicesbg3} alt="partner" priority fill />
          </div>
        </div>
        <div className="absolute inset-0 hidden sm:block ">
          <div className="w-full h-full overflow-hidden relative">
            <Image src={imgs.servicesbg1} alt="partner" priority fill />
          </div>
        </div>
        <div className="sm:hidden block bg-black/50 absolute inset-0" />

        <div className="absolute z-20 top-[3rem] sm:top-[4rem] w-full">
          <div className="flex flex-col gap-6 lg:gap-6 justify-center items-center">
            <h1 className="md:text-4xl w-full text-center text-2xl leading-3 text-white font-semibold">
              {categoryRequest?.data?.data.name}
            </h1>
            <div className="flex flex-wrap gap-2 lg:gap-5 max-w-[90%] sm:max-w-[50%] lg:max-w-[40%] mx-auto justify-center">
              {categoryRequest?.data?.data.options.map((item, index) => {
                return (
                  <div
                    key={index}
                    className=" p-2 rounded-md flex justify-center items-center gap-1 bg-[#FF9E3A87]/40"
                  >
                    <div className="w-[0.4rem] h-[0.4rem] rounded-full bg-[#00AEEF]" />
                    <span className="text-white text-[0.68rem] md:text-xs">
                      {item}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* filtering section */}
      <section className="flex flex-col gap-3 justify-start items-start sm:flex-row sm:justify-between px-4 py-2 sm:items-center sm:px-8 xl:px-40 bg-white">
        <p className="text-sm">
          {services?.length??0} result in <span className="font-bold">{categoryRequest?.data?.data.name} Service</span>
        </p>
        <div className="flex flex-wrap items-center justify-start sm:justify-end gap-3 ">
          <fieldset className="flex w-fit flex-col gap-1 ">
            <ItemPicker
              items={["All location"]}
              placeholder={"All Location"}
              getSelected={(val) =>{}}
              // contentClassName={"p-2 bg-white text-xs"}
              triggerClassName="px-3 py-[0.3rem] rounded w-[10rem]"
            />
          </fieldset>
          <fieldset className="flex w-fit flex-col gap-1 ">
            <ItemPicker
              items={["all"]}
              placeholder={"All"}
              getSelected={(val) =>{}}
              // contentClassName={"p-2 bg-white text-xs"}
              triggerClassName="px-3 py-[0.3rem] rounded w-[8rem] sm:w-[6rem]"
            />
          </fieldset>
          <fieldset className="flex w-fit flex-col gap-1 ">
            <ItemPicker
              items={["Sort by"]}
              placeholder={"Sort by"}
              getSelected={(val) =>{}}
              // contentClassName={"p-2 bg-white text-xs"}
              triggerClassName="px-3 py-[0.3rem] rounded w-[10rem] sm:w-[7rem]"
            />
          </fieldset>
          <div className="flex items-center gap-1">
            <span
              //   onClick={toggleflexDispaly}
              className={`${"bg-[#FFF4EA]"} border hover:bg-[#FFF4EA] duration-300 transition-all border-afruna-blue w-8 h-7 cursor-pointer flex justify-center items-center`}
            >
              <AiFillAppstore className="text-lg text-afruna-blue" />
            </span>
            <span
              //   onClick={toggleGridDispaly}
              className={` border hover:bg-[#FFF4EA] duration-300 transition-all border-afruna-blue w-8 h-7 cursor-pointer flex justify-center items-center`}
            >
              <BiMenu className="text-lg text-afruna-blue" />
            </span>
          </div>
        </div>
      </section>
      {/* services */}

      {services && services.length > 0 ? (
        <section className="flex flex-col lg:px-8 xl:px-20 lg:pb-12 px-4">
          <div className="flex flex-wrap sm:justify-center gap-4 mt-8 ">
            {services.map((item) => (
              <ServicesCard key={item._id} item={item} />
            ))}
          </div>
        </section>
      ) : <NoServicesFound />}

      {/* newsletter */}
      {/* <NewsLetter /> */}
    </main>
  );
};

export default Page;
