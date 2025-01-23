"use client";

import { galleryImg } from "@/constants/data";
import Image, { StaticImageData } from "next/image";
import { FC, useEffect, useState } from "react";

interface GallerySliderProps {photos:string[]}

const GallerySlider: FC<GallerySliderProps> = ({photos}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideImgLength = photos.length??0;

  const autoShow = true;
  let showInterval: string | number | NodeJS.Timeout | undefined;
  let intervalTime = 7000;

  const autoshow = () => {
    setCurrentSlide(currentSlide === slideImgLength - 1 ? 0 : currentSlide + 1);
  };

  useEffect(() => {
    setCurrentSlide(0);
  }, []);

  useEffect(() => {
    if (autoShow) {
      const auto = () => {
        showInterval = setInterval(autoshow, intervalTime);
      };
      auto();
    }
    return () => clearInterval(showInterval);
  }, [currentSlide, showInterval, autoshow]);

  return (
    <div className="flex flex-col mt-6 gap-4 justify-start w-full">
      <h2 className="text-2xl font-semibold ">Gallery</h2>
      <div className="flex flex-col gap-4 xl:mt-4">
        <div className="w-[18rem] h-[16rem] flex justify-start items-center">
          {photos.map(( img , index) => (
            <div
              key={index}
              className={`duration-700 transition-all ${
                index === currentSlide
                  ? " flex justify-start items-center opacity-100"
                  : "opacity-0"
              }`}
            >
              {index === currentSlide && (
                <div className="w-[18rem] xl:w-[23rem] h-[16rem] relative overflow-hidden flex justify-center items-center">
                  <Image
                    src={img}
                    alt={`details-img-${index}`}
                    key={index}
                    fill
                  />
                </div>
              )}
            </div>
          ))}
        </div>
        {/* dot bg */}
        <div className="flex justify-center sm:hidden gap-2 cnter items-center w-full">
          {photos.map((img , index) => {
            return (
              <button
                onClick={() => setCurrentSlide(index)}
                key={index}
                className={`${
                  index === currentSlide ? "bg-blue-400" : " bg-slate-400"
                } w-[0.8rem] h-[0.8rem] transition-all duration-500 rounded-full flex justify-center items-center`}
              ></button>
            );
          })}
        </div>
      </div>
      {/* small images */}
      <div className="hidden sm:flex gap-1 justify-start items-center xl:mt-4 w-full">
        {photos.map(( img , index) => {
          return (
            <button
              onClick={() => setCurrentSlide(index)}
              key={index}
              className={`${
                index === currentSlide
                  ? "border-orange-400 border-opacity-100"
                  : "border-opacity-0"
              } border transition-all duration-500 rounded-md overflow-hidden flex justify-center items-center`}
            >
              <div className="w-[3.8rem] h-[3rem] xl:w-[5.1rem] xl:h-[4rem] relative overflow-hidden flex justify-center items-center">
                <Image
                  src={img as unknown as StaticImageData}
                  alt="details-img"
                  key={index}
                  fill
                />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );

  
};

export default GallerySlider;
