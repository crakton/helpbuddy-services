"use client";

import { NewsLetter } from "@/components/NewsLetter";
import { Button } from "@/components/ui/button";
import { imgs } from "@/constants/images";
import axios from "axios";
import getSymbolFromCurrency from "currency-symbol-map";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC, useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { BsStarFill } from "react-icons/bs";
import { HiLocationMarker, HiMail } from "react-icons/hi";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { Loader } from "lucide-react";
import { useAppSelector } from "@/hooks";
import { verifyImageUrl } from "@/utils/verify_image_url";

interface pageProps {
  params: {
    bookingId: string;
  };
}

const BookingsPage: FC<pageProps> = ({ params: { bookingId } }) => {
  const router = useRouter();
  const {profile_data} = useAppSelector((state)=>state.profile);
  const {
    register,
    formState: { errors },
  } = useForm();

  const service = {
    price:3,
    name:"",
    ratedBy:"",
    ratings:"",
    state:"",
    country:"",


  }

  const provider = {
    email:"",
    firstName:"",
    lastName:"",
    avatar:"",
  }


  const category = {
    name:""
  }
  // const handleBooking = useCallback(async () => {
  //   if (service) {
  //     const payload = {
  //       amount: service.price + 1000,
  //       location: `${profile_data?.country}`,
  //       serviceId: bookingId,
  //     }
  //     await makeBooking(payload);
      
  //     if (bookingResponse.isError) {
  //       toast.warn("Booking failed, try again!");
  //     } else {
  //       if (bookingResponse.isSuccess){
  //         toast.info("Confirmed! Redirecting to payment");
  //         const bookingData = bookingResponse.data?.data;
  //         try {
  //           const res = await axios.post<{
  //             success: boolean;
  //             message: string;
  //             data: {
  //               authorization_url: string;
  //               access_code: string;
  //               reference: string;
  //             };
  //           }>(
  //             "/api/transactions/service?url=localhost:3000/bookings",
  //             { bookingId: bookingData?._id },
  //             {
  //               headers: {
  //                 Authorization: `Bearer ${Cookies.get("token")}`,
  //               },
  //             }
  //           );
  //           window.location.replace(res.data.data.authorization_url);
  //         } catch (error) {
  //           toast.warn("Payment failed");
  //           router.replace("/bookings");
  //         }
  //       }
      
  //     }
  //   }
  // }, [service, profile_data?.country, bookingId, makeBooking, bookingResponse.isError, bookingResponse.isSuccess, bookingResponse.data?.data, router]);

  return (
    <>
      <section className="bg-white flex justify-center flex-col font-bold items-center gap-4 h-[10rem]">
        <h1 className="text-[1.8rem]">Service Booking</h1>
        <div className="flex items-center justify-center gap-2">
          <span className=" text-afruna-blue text-lg">{service?.name}</span>
          <span className="w-[0.4rem] h-[0.4rem] rounded-full bg-sky-500"></span>
          <span className=" text-afruna-gray">Booking Confirmation</span>
        </div>
      </section>

      <section className="max-w-[90%] lg:max-w-[80%] mx-auto py-8 px-4 sm:px-8 pb-10 md:pb-16 mt-6 sm:mt-12 mb-8 sm:mb-16 lg:mt-10 bg-white rounded-2xl ">
        <div className="flex flex-col sm:flex-row gap-6 justify-start items-center">
          <div className="w-full h-[11.5rem] lg:w-[15rem] lg:h-[11.5rem] rounded-md overflow-hidden relative flex justify-center items-center">
            <Image src={imgs.disSer2} alt={`service image`} fill />
          </div>
          <div className="flex flex-col gap-2 justify-start">
            <span className="py-1 px-6 w-fit bg-sky-100 text-sky-500 text-xs">
              {category?.name}
            </span>
            <h3 className="text-sm my-[0.68rem] font-semibold w-fit text-afruna-blue">
              {service?.name}
            </h3>
            <div className="flex justify-start w-fit gap-2 items-center">
              <div className=" w-[3rem] h-[3rem] rounded-full overflow-hidden relative flex justify-center items-center">
                <Image
                  src={verifyImageUrl(provider?.avatar as string)}
                  alt={`vendor image`}
                  fill
                />
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-[0.8rem] font-semibold">
                  {provider?.firstName} {provider?.lastName}
                </h2>
                <div className="flex justify-start items-center gap-2 text-xs">
                  <BsStarFill className="text-afruna-gold text-xs" />
                  {service?.ratings}{" "}
                  <span className=" text-afruna-gray text-xs ml-2">
                    ({service?.ratedBy})
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 justify-start items-center">
              <div className="flex gap-2 flex-col justify-start ">
                <div className="flex justify-start font-semibold items-center text-xs">
                  {/* <HiLocationMarker className="text-[#0382BD] mr-1 text-xl lg:text-lg" /> */}
                  <div className="w-[1rem] mr-1 h-[1rem] overflow-hidden relative flex justify-center items-center">
                    <Image src={imgs.cost} alt={`cost`} fill />
                  </div>
                  Service Cost{" "}
                </div>
                <span className="text-sm text-afruna-blue font-extrabold">
                  {getSymbolFromCurrency("NGN")}
                  {(1000 + (service?.price as number) as number).toLocaleString()}
                </span>
              </div>
              <div className="flex gap-2 flex-col justify-start ">
                <div className="flex justify-start font-semibold items-center text-xs">
                  <HiLocationMarker className="text-[#0382BD] mr-1 text-xl lg:text-lg" />
                  Location{" "}
                </div>
                <span className="text-[0.68rem] text-afruna-gray">
                  {service?.state}, {service?.country}
                </span>
              </div>
              <div className="flex gap-2 flex-col justify-start ">
                <div className="flex justify-start font-semibold items-center text-xs">
                  <HiMail className="text-[#0382BD] mr-1 text-xl lg:text-lg" />
                  Email{" "}
                </div>
                <span className="text-[0.68rem] text-afruna-gray">
                  {provider?.email}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <Button
            // disabled={bookingResponse.isLoading}
            variant={"primary"}
            type="button"
            // onClick={"handleBooking"}
          >
            {/* {bookingResponse.isLoading && <Loader/>} */}
            Confirm service booking
          </Button>
        </div>
        {/* <section className="flex flex-col mt-4 gap-2 w-fit">
          <h2 className="text-lg font-bold text-afruna-blue">
            {" "}
            Work Commencement date
          </h2>
          <p className="text-xs font-semibold">
            Select your preferred data for the excution of service you want book
          </p>
        </section>
        <form className="flex mt-6 sm:mt-10 flex-col max-w-[100%] sm:max-w-[65%] gap-x-8 gap-y-8 sm:gap-y-16">
          <div className="flex flex-col sm:flex-row justify-center gap-x-8 gap-y-4 items-center">
            <Input
              label="From"
              id="fr_date"
              type={"date"}
              placeholder="Select date"
              errors={errors}
              register={register}
              className="px-2.5 py-1.5"
            />
            <Input
              label="To"
              id="to_date"
              type={"date"}
              placeholder="Select date"
              errors={errors}
              register={register}
              className="px-2.5 py-1.5"
            />
          </div>
          <div className="flex justify-end">
            <Button variant={"primary"} type="button" onClick={() => push('/payment')}>
              Confirm service booking
            </Button>
          </div>
        </form> */}
      </section>
      {/* newsletter */}
      {/*     <NewsLetter /> */}
    </>
  );
};

export default BookingsPage;
