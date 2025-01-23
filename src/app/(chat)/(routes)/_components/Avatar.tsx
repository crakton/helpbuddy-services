
import { imgs } from "@/constants/images";
import Image, { StaticImageData } from "next/image";
import { FC } from "react";

interface AvatarProps {
  img: string |StaticImageData;
  active?: boolean;
  isOwn?: boolean;
  convo?: boolean;
}

export const Avatar: FC<AvatarProps> = ({ img, active, isOwn, convo }) => {
  return (
    <div className="flex relative ">
      <Image
      height={40}
      width={40}
        src={img}
        alt="image"
        priority
        className={`${convo ? "w-8 h-8" : "w-12 h-12"} rounded-full ${
          isOwn && "order-2"
        }`}
      />
      <span
        className={`${active ? "bg-blue-500" : "bg-slate-400"} ${
          convo ? "hidden" : ""
        } absolute rounded-full h-2 w-2 ${
          convo ? "bottom-6" : "bottom-1"
        }  right-1 ring-2 ring-white`}
      />
    </div>
  );
};
