"use client";

import ItemPicker from "@/components/ItemPicker";
import { NewsLetter } from "@/components/NewsLetter";
import ServicesCard from "@/components/ServicesCard";
import NoServicesFound from "@/components/ui/NoServicesFound";
import { imgs } from "@/constants/images";
import { useGetServiceByIdQuery, useGetServicesByCategoryIdQuery } from "@/lib/redux/features/apis/services_api";
import Image from "next/image";
import { FC } from "react";
import { AiFillAppstore } from "react-icons/ai";
import { BiMenu } from "react-icons/bi";

interface pageProps {
  params: {
    id: string;
  };
}

const Page: FC<pageProps> = ({ params: { id } }) => {
  const { data } = useGetServiceByIdQuery(id);
  const _service = data?.data;
  const sevicesRequest = useGetServicesByCategoryIdQuery(_service?.category as string);
  const _services = sevicesRequest.data;
  return (
    <main>
      {/*  Different service detai */}
      <section className="w-full relative h-[22rem] px-4 xl:px-40 flex flex-col gap-6 sm:flex-row justify-center items-center sm:justify-start">
        <div className="hidden md:block absolute bottom-0 right-0">
          <div className="w-[25rem] h-[22rem] overflow-hidden relative rounded-sm">
            <Image
              src={
                _service && _service?.photos.length > 0
                  ? _service?.photos[0]
                  : imgs.testing
              }
              alt="partner"
              priority
              fill
            />
          </div>
        </div>

        <div className="w-full h-[15rem] lg:w-[23rem] lg:h-[15rem] overflow-hidden relative rounded-sm">
          <Image src={imgs.detailservice} alt="partner" priority fill />
        </div>
        <h2 className="text-xl font-semibold md:text-2xl text-afruna-blue">
          {_service?.name}
        </h2>
      </section>
      {/* filtering section */}
      <section className="flex flex-col gap-3 justify-start items-start sm:flex-row sm:justify-between px-4 py-4 md:py-6 sm:items-center sm:px-8 xl:px-40 bg-white">
        <p className="text-sm">
          {_services?.data.length} result in{" "}
          <span className="font-bold">{_services?.totalDocs}</span>
        </p>
        <div className="flex flex-wrap items-center justify-start sm:justify-end gap-3 ">
          <fieldset className="flex w-fit flex-col gap-1 ">
            <ItemPicker
              items={["All location"]}
              placeholder={"All Location"}
              getSelected={(val) => console.log(val as string)}
              // contentClassName={"p-2 bg-white text-xs"}
              triggerClassName="px-3 py-[0.3rem] rounded w-[10rem]"
            />
          </fieldset>
          <fieldset className="flex w-fit flex-col gap-1 ">
            <ItemPicker
              items={["all"]}
              placeholder={"All"}
              getSelected={(val) => console.log(val as string)}
              // contentClassName={"p-2 bg-white text-xs"}
              triggerClassName="px-3 py-[0.3rem] rounded w-[8rem] sm:w-[6rem]"
            />
          </fieldset>
          <fieldset className="flex w-fit flex-col gap-1 ">
            <ItemPicker
              items={["Sort by"]}
              placeholder={"Sort by"}
              getSelected={(val) => console.log(val as string)}
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
{_services && _services.data.length > 0?(
          <section className="flex flex-col lg:px-8 xl:px-20 lg:pb-12 px-4">
          <div className="flex flex-wrap sm:justify-center gap-4 mt-8 ">
            {_services.data.map((item) => {
              return <ServicesCard key={item._id} item={item} />;
            })}
          </div>
        </section>
):<NoServicesFound />}
      {/* newsletter */}
      {/*     <NewsLetter /> */}
    </main>
  );
};

export default Page;
