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
import NoServicesFound from "@/components/ui/NoServicesFound";
import { providers, services } from "@/constants/data";
import SearchComponent from "@/components/searchComponent";

interface pageProps {
  params: {
    categoryId:string
  }
}

const Page: FC<pageProps> = ({params: {categoryId}}) => {
  const [page, setPage] = useState(1);

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
          
          {/* <div className="flex flex-col gap-6 lg:gap-6 justify-center items-center">
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
          </div> */}
        </div>
      </section>
      

      <SearchComponent providers={providers} services={services} />

      {services && services.length > 0 ? (
        <section className="flex flex-col lg:px-8 xl:px-20 lg:pb-12 px-4">
          <div className="flex flex-wrap sm:justify-center gap-4 mt-8 ">
            {services.map((item) => (
              <ServicesCard key={item.$id} item={item} />
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
