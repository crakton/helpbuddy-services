"use client";
import CategoryCard from "@/components/CategoryCard";
import { useGetCategoriesByPaginationQuery} from "@/lib/redux/features/apis/categories_api";
import { FC, useState } from "react";

interface pageProps {}

const Page: FC<pageProps> = ({}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const {data} = useGetCategoriesByPaginationQuery(currentPage);
  return (
    <>
      <section className="bg-white flex justify-center flex-col font-bold items-center gap-4 h-[11rem]">
        <h1 className="text-[1.8rem]">Featured Categories</h1>
        <div className="flex items-center justify-center gap-2">
          <span className=" text-afruna-blue text-lg">Home</span>
          <span className="w-[0.4rem] h-[0.4rem] rounded-full bg-sky-500"></span>
          <span className=" text-afruna-gray">categories</span>
        </div>
      </section>
      <section className="px-8 lg:px-20 pb-10 md:pb-16 flex flex-wrap sm:justify-center mt-12 gap-6 md:gap-8 lg:mt-10 ">
        {data?.data.map((item) => {
          return <CategoryCard key={item._id} item={item} />
        })}
      </section>
      {/* <NewsLetter/> */}
    </>
  );
};

export default Page;
