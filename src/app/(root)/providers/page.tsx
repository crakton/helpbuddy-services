"use client";
import { NewsLetter } from "@/components/NewsLetter";
import PageLoader from "@/components/PageLoarder";
import { ProviderCard } from "@/components/ProviderCard";
import { providers } from "@/constants/data";
import { useGetProvidersQuery } from "@/lib/redux/features/apis/providers_api";
import { FC } from "react";

interface pageProps {}

const Page: FC<pageProps> = ({}) => {
  const { data, error, isLoading } = useGetProvidersQuery();
  return (
    <>
      <section className="bg-white flex justify-center flex-col font-bold items-center gap-4 h-[11rem]">
        <h1 className="text-[1.8rem]">Service Provider</h1>
        <div className="flex items-center justify-center gap-2">
          <span className=" text-afruna-blue text-lg">Home</span>
          <span className="w-[0.4rem] h-[0.4rem] rounded-full bg-sky-500"></span>
          <span className=" text-afruna-gray">Provider</span>
        </div>
      </section>
      <section className="px-8 lg:px-28 pb-10 md:pb-16 flex flex-wrap sm:justify-center mt-12 gap-6 md:gap-8 lg:mt-10 ">
        {data && data.length
          ? data.slice(0, 12).map((item) => {
              return <ProviderCard key={item._id} item={item} />;
            })
          : null}
      </section>
      {/* newsletter */}
    {/*   <NewsLetter /> */}
    </>
  );
};

export default Page;
