"use client";

import { FC, useCallback } from "react";
import { buttonVariants } from "./ui/button";
import { HiLocationMarker } from "react-icons/hi";
import Image from "next/image";
import { BsHeartFill, BsStarFill } from "react-icons/bs";
import Link from "next/link";
import classNames from "classnames";
import { IServices } from "@/interfaces";
import { imgs } from "@/constants/images";
import getSymbolFromCurrency from "currency-symbol-map";
import { useAppDispatch } from "@/hooks";
import { toggleFavoriteServices } from "@/lib/redux/features/slices/favoriteSlice";

// import { useRouter } from "next/navigation";

interface ServicesCardProps {
  item: IServices;
}

const ServicesCard: FC<ServicesCardProps> = ({ item }) => {
  const dispatch = useAppDispatch();

  const handleFavorite = useCallback(() => {
    dispatch(toggleFavoriteServices(item));
  }, [dispatch, item]);

  return (
    <div className="bg-white p-2 pb-4 lg:pb-4 rounded-lg md:px-4 w-full sm:max-w-[17rem] md:max-w-[21rem] lg:max-w-[18rem] xl:max-w-[21rem] shadow-md flex flex-col gap-1 relative">
      <div className="relative flex justify-center  items-center h-[13rem] lg:h-[13rem] ">
        <div className="w-full h-full overflow-hidden relative rounded-lg">
          <Image
            src={
              item?.images && item.images.length > 0
                ? item.images[0]
                : imgs.servicesbg1
            }
            alt="partner"
            priority
            fill
          />
        </div>
        <Link
          href={`/service/${item.$id}`}
          className={classNames(
            buttonVariants({ variant: "whiteButton" }),
            "text-sm lg:text-xs h-8 absolute top-3 left-4"
          )}
        >
          {item.category.name}
        </Link>
        <button onClick={handleFavorite} className=" ">
          <BsHeartFill className="absolute top-3 right-4 text-xl text-[#A7B7DD]" />
        </button>
      </div>
      <div className="flex items-center mt-1 justify-center text-sm ">
        <h4 className="font-bold text-afruna-blue  px-2 lg:text-sm w-full truncate">
          {item.name}
        </h4>

        <p
          style={{
            backgroundColor: `${item.isActive ? "#83ffa0" : "#ff9ea0"}`,
            color: `${item.isActive ? "#0abf56" : "#ff3c59"}`,

            paddingTop: "5px",
            paddingBottom: "5px",
            paddingLeft: "5px",
            paddingRight: "5px",
          }}
          className="rounded-full"
        >
          {item.isActive ? "Active" : "Occupied"}
        </p>
      </div>
      <div className="mt-1 flex justify-between items-center px-2 lg:text-xs text-afruna-gray font-semibold">
        <span className="flex items-center text-sm gap-2 lg:gap-1">
          <HiLocationMarker className="text-[#0382BD] text-xl lg:text-lg" />
          {item.country}
        </span>
        <span className="flex items-center gap-2 lg:gap-1  ">
          <BsStarFill className="text-afruna-gold" />
          {item.ratings}
        </span>
      </div>
      <div className="mt-1 flex justify-between px-2 items-center">
        <span className="flex items-center gap-1 font-bold text-afruna-blue lg:text-sm">
          {getSymbolFromCurrency("NGN")}
          {item.price.toLocaleString()}
        </span>
        <Link
          href={`/service/${item.$id}`}
          className="text-afruna-blue text-sm lg:text-xs bg-gradient-to-b from-sky-300 to-sky-100 hover:bg-gradient-to-r hover:from-sky-300 hover:to-sky-50 p-3 rounded-md transition duration-500"
        >
          View Service
        </Link>
      </div>
    </div>
  );
};

export default ServicesCard;

// BsHeartFill BsStarFill
