"use client";
import { IProvider } from "@/interfaces/data.interface";
import { FC, useCallback, useMemo, useRef } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { IoMdCheckmark } from "react-icons/io";
import { IUser } from "@/interfaces";
import { imgs } from "@/constants/images";
import { useRouter } from "next/navigation";
import { useGetServicesQuery } from "@/lib/redux/features/apis/services_api";
import Link from "next/link";

interface ProviderCardProps {
  item: IUser
}

export const ProviderCard: FC<ProviderCardProps> = ({ item }) => {

  const {isSuccess, data} = useGetServicesQuery();

  const service = useMemo(()=> {
    
    if (isSuccess) {
      return data.data.find(service => service.providerId._id === item._id);
    }
  },[data?.data, isSuccess, item._id]);
  const services = useMemo(()=> {

    if (isSuccess) {
      return data.data.filter(service => service.providerId._id === item._id);
    }
  },[data?.data, isSuccess, item._id]);

  const sumRatedBy = useMemo(()=> services?.reduce((acc:number, service)=> acc+service.ratedBy, 0),[services])
  const sumRatings = useMemo(()=> services?.reduce((acc:number, service)=> acc+service.ratings, 0),[services]);
  
  const averegeRating = useMemo(()=> {
    if (sumRatings && services){
      return sumRatings/services.length;
    }
    return 0;
  },[services, sumRatings]);

  return (
    <div className="bg-white rounded-lg max-w-[20rem] sm:max-w-[18rem] lg:max-w-[16rem] mx-auto p-4 md:px-4 py-10 w-full shadow-md flex flex-col gap-4">
      <div className="mx-auto w-[6.5rem] h-[6.5rem] rounded-full overflow-hidden md:w-[6rem] md:h-[6rem] relative flex justify-center items-center">
        <Image src={item.avatar??imgs.anonyUser} alt={`seler image`} fill />
      </div>
      <div className="mt-1 flex justify-start flex-col px-4">
        <div className="flex items-center gap-2">
          <h2 className=" text-afruna-blue capitalize font-bold lg:text-sm">{item.firstName}  {item.lastName}</h2>{" "}
          <span className="rounded-full text-xs text-green-700 w-[1.2rem] h-[1.2rem] bg-green-300  flex justify-center items-center">
          <IoMdCheckmark size={14} />
          </span>
        </div>
        <span className="mt-[0.4rem] text-afruna-gray font-semibold lg:text-sm">{service?.name}</span>
        <div className="flex gap-2 items-center mt-2">
          <div className="flex items-center gap-2 ">
            {Array(5)
              .fill("_")
              .map((_, index) => (
                <div
                  className={`${
                    index < averegeRating ? "text-[#FF9E3A]" : "text-slate-400"
                  }  text-sm md:text-xs`}
                  key={index}
                >
                  {index < averegeRating ? (
                    index === Math.floor(averegeRating) && averegeRating % 1 !== 0 ? (
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
          <span className="text-sm">{sumRatedBy??0}</span>
        </div>
      </div>
      <Link href={`/providers/${item._id}`} className="mx-auto p-2 bg-gradient-action-provider hover:bg-gradient-action-btn text-xs md:text-sm text-white rounded-md">
        Book Service
      </Link>
    </div>
  );
};

// BsHeartFill BsStarFill
