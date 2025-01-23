"use client";

import { providerReviews } from "@/constants/data";
import { imgs } from "@/constants/images";
import { IReview } from "@/interfaces";
import Image, { StaticImageData } from "next/image";
import { FC, useEffect, useState } from "react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

interface ProviderReviewsSliderProps {
  reviews?: IReview[]
}

const ProviderReviewsSlider: FC<ProviderReviewsSliderProps> = ({reviews}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideImgLength =  reviews?.length??0;

  const autoShow = slideImgLength >1?true:false;
  let showInterval: string | number | NodeJS.Timeout | undefined;
  let intervalTime = 7000;

  const nextSlide = () => {
    setCurrentSlide(
      currentSlide === slideImgLength - 1 ? currentSlide : currentSlide + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? currentSlide : currentSlide - 1);
  };

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

  return reviews && reviews.length? (
    <div className="flex flex-col mt-6 gap-4 justify-start w-full">
      <h2 className="text-2xl font-semibold ">What people are saying</h2>
      {/* <div className="flex flex-col gap-4 xl:mt-4"> */}
      <div className="w-full relative flex justify-start items-center rounded-lg px-12 py-8 bg-white">
        <button
          className={`${
            currentSlide === 0
              ? "bg-gray-300 shadow-md text-white border-transparent"
              : "border-yellow-500 hover:bg-white"
          } border z-10 w-[1.6rem] h-[1.6rem] bg-transparent duration-300 transition-all flex justify-center items-center rounded-full cursor-pointer absolute top-[50%] transform -translate-y-2/4 left-3`}
        >
          <MdKeyboardArrowLeft
            size={18}
            onClick={prevSlide}
            //transform -translate-y-2/4  transform: translateY(-50%);
          />
        </button>
        <button
          className={`${
            currentSlide === slideImgLength - 1
              ? "bg-gray-300 shadow-md text-white border-transparent"
              : "border-yellow-500  hover:bg-white"
          } border z-10 w-[1.6rem] h-[1.6rem] bg-transparent duration-300 transition-all flex justify-center items-center rounded-full cursor-pointer absolute top-[50%] transform -translate-y-2/4 right-3`}
        >
          <MdKeyboardArrowRight size={18} onClick={nextSlide} />
        </button>

        { reviews.map(({ _id,comment,createdAt,rating,serviceId,updatedAt,userId }, index) => (
          <div
            key={index+_id}
            className={`duration-700 transition-all  ${
              index === currentSlide
                ? " flex justify-center gap-2 items-start opacity-100"
                : "opacity-0"
            }`}
          >
            {index === currentSlide && (
              <>
                <div className="flex">
                  <div className="w-[2rem] h-[2rem] relative overflow-hidden flex justify-center items-center">
                    <Image
                      src={userId.avatar??imgs.anonyUser}
                      alt={`details-img-${index}`}
                      key={index}
                      fill
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center w-full">
                    <h4 className="text-sm font-semibold">{userId.firstName??"Anonymous"} {userId.lastName??"User"}</h4>
                    <div className="flex justify-center items-center gap-2 ">
                      {Array(5)
                        .fill("_")
                        .map((star, index) => (
                          <div
                            className={`${
                              index < rating
                                ? "text-[#FF9E3A]"
                                : "text-slate-400"
                            }  text-xs md:text-xs`}
                            key={index}
                          >
                            {index < rating ? (
                              index === Math.floor(rating) &&
                              rating % 1 !== 0 ? (
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
                  <p className="text-xs">{comment}</p>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      {/* </div> */}
    </div>
  ):null;

  //   return (
  //     <div className="flex flex-col gap-4 max-w-[22rem] w-full md:max-w-full ">
  //       <div className="h-[19rem] md:h-[18rem] lg:h-[20rem] rounded-md shadow-md flex justify-center items-center bg-white relative overflow-hidden">
  //         {oneProduct.images.map((img, index) => (
  //           <div
  //             key={index}
  //             className={`duration-700 transition-all ${
  //               index === currentSlide
  //                 ? " flex justify-center items-center opacity-100"
  //                 : "opacity-0"
  //             }`}
  //           >
  //             {index === currentSlide && (
  //               <div className="w-[16rem] h-[16rem] rounded-md md:w-[11.5rem] md:h-[11.5rem] lg:w-[16rem] lg:h-[16rem] relative overflow-hidden flex justify-center items-center">
  //                 <Image
  //                   src={img}
  //                   alt={`details-img-${index}`}
  //                   key={index}
  //                   fill
  //                 />
  //               </div>
  //             )}
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   );
};

export default ProviderReviewsSlider;
