"use client";
import FavoriteServiceCard from "@/components/FavoriteServiceCard";
import ServicesCard from "@/components/ServicesCard";
import { useAppSelector } from "@/hooks";
import { FC } from "react";
import { FaViadeoSquare } from "react-icons/fa";

interface pageProps {}

const Page: FC<pageProps> = ({}) => {
  const {favs} = useAppSelector((state) => state.favorites);
  console.log("favs");
  console.log(FaViadeoSquare);
  return (
    <section className="flex flex-col gap-6 max-w-[94%] md:max-w-[100%] mx-auto">
      <h1 className="text-xl lg:text-2xl leading-3 text-afruna-blue font-bold">
        Favorite
      </h1>
      {favs.length > 0 ? (
        <div className="flex flex-wrap gap-8 ">
          {favs.map((item) => {
            return <ServicesCard key={item._id} item={item} />;
          })}
        </div>
      ) : null}
    </section>
  );
};

export default Page;
