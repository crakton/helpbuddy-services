"use client"
import NoServicesFound from "@/components/ui/NoServicesFound";
import NoThingFound from "@/components/ui/NothingFound";
import { Button } from "@/components/ui/button";
import { imgs } from "@/constants/images";
import { useGetMyReviewsQuery, useGetReviewsQuery } from "@/lib/redux/features/apis/reviews_api";
import { verifyImageUrl } from "@/utils/verify_image_url";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";

interface pageProps {}

const Page: FC<pageProps> = ({}) => {

  const {isSuccess, data} = useGetReviewsQuery();

  return (
    <section className="flex flex-col gap-6 max-w-[94%] md:max-w-[100%] mx-auto">
      <h1 className="text-xl pl-2 lg:pl-0 lg:text-2xl leading-3 text-afruna-blue font-bold">
        Service Review
      </h1>
      <div className="flex flex-col gap-4 max-w-[95%] lg:max-w-[90%] mx-auto lg:mx-0  w-full">
      {isSuccess? data.data.map((review)=> {
        return (
          <div key={review._id} className="py-6 px-4 flex flex-col lg:flex-row justify-between w-full bg-white drop-shadow rounded-lg">
          <div className="flex flex-col gap-4 lg:max-w-[75%] w-full">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex justify-center items-center h-[12rem] sm:w-[8rem] sm:h-[6rem]">
                  <div className="w-full h-full overflow-hidden relative rounded-md">
                    <Image src={imgs.review1} alt="review" priority fill />
                  </div>
                </div>
                <div className="flex flex-col gap-6">
                  <h2 className="text-lg sm:text-2xl font-semibold leading-6 order-1 sm:-order-1">
                    {review?.serviceId?.name??"Service"}
                  </h2>
                  <div className="flex justify-start items-center gap-2">
                    <div className="w-[2.3rem] h-[2.3rem] overflow-hidden rounded-full relative flex justify-center items-center">
                      <Image src={verifyImageUrl(review?.userId.avatar as string)} alt="review" priority fill />
                    </div>
                    <span className="sm:text-sm text-[0.65rem] text-afruna-blue capitalize font-semibold">
                      {review?.userId.firstName} {review.userId.lastName}
                    </span>
                    <span className="sm:text-sm text-[0.65rem] text-afruna-gray">

                    </span>
                  </div>
                </div>
              </div>
              <p className="text-xs">
              {review.comment}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-5 lg:gap-8 justify-center items-center lg:max-w-[25%] w-full mt-4 lg:mt-0">
            <div className="flex items-center gap-4 order-1 lg:-order-1">
            {review?.serviceId?._id && (  <Link 
                href={`/booking/${review?.serviceId?._id}`}
                className="max-w-[15rem] text-center p-2 bg-gradient-action-provider hover:bg-gradient-action-btn text-xs md:text-sm text-white rounded-md w-full"
              >
                Re-Book
              </Link>)}
            {review?.serviceId === undefined && (  <button 
                disabled
                className="max-w-[15rem] cursor-not-allowed text-center p-2 bg-gradient-action-provider hover:bg-gradient-action-btn text-xs md:text-sm text-white rounded-md w-full"
              >
                Re-Book
              </button>)}
              {/* <Button variant={"skyButton"} className="text-xs">
                Add review
              </Button> */}
            </div>
            <div className="flex items-center gap-2 ">
              {Array(5)
                .fill("_")
                .map((_, index) => (
                  <div
                    className={`${
                      index < review.rating ? "text-[#FF9E3A]" : "text-slate-400"
                    }  text-sm md:text-xs`}
                    key={index}
                  >
                    {index < review.rating ? (
                      index === Math.floor(review.rating) && review.rating % 1 !== 0 ? (
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
        )
      }):<NoThingFound message={"No Reviews yets!"} />}
      </div>
    </section>
  );
};

export default Page;
