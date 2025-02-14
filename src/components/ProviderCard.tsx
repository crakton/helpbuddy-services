"use client";
import { IProvider } from "@/interfaces/data.interface";
import { FC } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { IoMdCheckmark } from "react-icons/io";
import Link from "next/link";

interface ProviderCardProps {
  item: IProvider;
}

export const ProviderCard: FC<ProviderCardProps> = ({ item }) => {
  return (
    <div className="bg-white rounded-lg max-w-[20rem] sm:max-w-[18rem] lg:max-w-[16rem] mx-auto p-4 md:px-4 py-10 w-full shadow-md flex flex-col gap-4">
      {/* Profile Image */}
      <div className="mx-auto w-[6.5rem] h-[6.5rem] rounded-full overflow-hidden md:w-[6rem] md:h-[6rem] relative flex justify-center items-center">
        <Image src={item.imageUrl} alt={`${item.name} profile`} fill />
      </div>

      {/* Provider Info */}
      <div className="mt-1 flex flex-col px-4">
        <div className="flex items-center gap-2">
          <h2 className="text-afruna-blue capitalize font-bold lg:text-sm">{item.name}</h2>
          <span className="rounded-full text-xs text-green-700 w-[1.2rem] h-[1.2rem] bg-green-300 flex justify-center items-center">
            <IoMdCheckmark size={14} />
          </span>
        </div>
        <span className="mt-[0.4rem] text-afruna-gray font-semibold lg:text-sm">{item.serviceCategory}</span>

        {/* Rating */}
        <div className="flex gap-2 items-center mt-2">
          <div className="flex items-center gap-1">
            {Array(5)
              .fill("_")
              .map((_, index) => (
                <div
                  className={`${
                    index < Math.floor(item.rating)
                      ? "text-[#FF9E3A]"
                      : "text-slate-400"
                  } text-sm md:text-xs`}
                  key={index}
                >
                  {index < Math.floor(item.rating) ? (
                    index === Math.floor(item.rating) && item.rating % 1 !== 0 ? (
                      <BsStarHalf />
                    ) : (
                      <BsStarFill />
                    )
                  ) : (
                    <BsStar />
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Book Service Button */}
      <Link
        href={`/providers/${item.$id}`}
        className="mx-auto p-2 bg-gradient-action-provider hover:bg-gradient-action-btn text-xs md:text-sm text-white rounded-md"
      >
        See More 
      </Link>
    </div>
  );
};
