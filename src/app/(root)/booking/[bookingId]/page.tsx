"use client";

import { Button } from "@/components/ui/button";
import { imgs } from "@/constants/images";
import getSymbolFromCurrency from "currency-symbol-map";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC, useState} from "react";
import { HiLocationMarker, HiMail } from "react-icons/hi";
import { toast } from "react-toastify";
import { verifyImageUrl } from "@/utils/verify_image_url";
import ConfirmModal from "@/components/ui/ConfirmModal";

interface pageProps {
  params: {
    bookingId: string;
  };
}

const BookingsPage: FC<pageProps> = ({ params: { bookingId } }) => {
  const router = useRouter();

  const [confirmed, setConfirmed] = useState(false)

  //generate a handle confirm function to book a service
  const handleConfirm = async () => {
    try {
      // Here you would call your backend API to confirm the booking
      // For now, we simulate the confirmation by setting the status to "Confirmed"
      service.status = "Confirmed";
      router.push("/bookings")
      setConfirmed(true);

      // Show success toast
      toast.success("Booking confirmed successfully!");
    } catch (error) {
      // Show error toast
      toast.error("Failed to confirm booking. Please try again later.");
    }
  };

  //generate a handleCancel function to
  const handleCancel = () => {
    setConfirmed(false)
    router.push("/services");
  };
;


  const service = {
    _id: "",
    photos: [],
    name: "",
    status: "Confirmed",
    createdAt: Date.now(),
    amount: "",
    location: "",
    provider: "",
    price:100,
    category:{
      name:"Electrician"
    },

    providerId: {
      _id: "prv6",
      name: "Amina Bello",
      email: "",
      rating: 4.5,
      avatar: imgs.provider2 || "",
      location: "Lagos",
      contact: "+2348000000006",
      createdAt: new Date().toISOString(),
    },
  };

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
              {service.category?.name}
            </span>
            <h3 className="text-sm my-[0.68rem] font-semibold w-fit text-afruna-blue">
              {service?.name}
            </h3>
            <div className="flex justify-start w-fit gap-2 items-center">
              <div className=" w-[3rem] h-[3rem] rounded-full overflow-hidden relative flex justify-center items-center">
                <Image
                  src={verifyImageUrl(service.providerId?.avatar)}
                  alt={`vendor image`}
                  fill
                />
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-[0.8rem] font-semibold">
                  {service.providerId?.name} 
                </h2>
                {/* <div className="flex justify-start items-center gap-2 text-xs">
                  <BsStarFill className="text-afruna-gold text-xs" />
                  {service?.ratings}{" "}
                  <span className=" text-afruna-gray text-xs ml-2">
                    ({service?.ratedBy})
                  </span>
                </div> */}
              </div>
            </div>
            <div className="flex flex-wrap gap-4 justify-start items-center">
              <div className="flex gap-2 flex-col justify-start ">
                <div className="flex justify-start font-semibold items-center text-xs">
                  <HiLocationMarker className="text-[#0382BD] mr-1 text-xl lg:text-lg" />
                  <div className="w-[1rem] mr-1 h-[1rem] overflow-hidden relative flex justify-center items-center">
                    <Image src={imgs.cost} alt={`cost`} fill />
                  </div>
                  Service Cost{" "}
                </div>
                <span className="text-sm text-afruna-blue font-extrabold">
                  {getSymbolFromCurrency("NGN")}
                  {(
                    (1000 + (service?.price as number)) as number
                  ).toLocaleString()}
                </span>
              </div>
              <div className="flex gap-2 flex-col justify-start ">
                <div className="flex justify-start font-semibold items-center text-xs">
                  <HiLocationMarker className="text-[#0382BD] mr-1 text-xl lg:text-lg" />
                  Location{" "}
                </div>
                <span className="text-[0.68rem] text-afruna-gray">
                  {service?.location}
                </span>
              </div>
              <div className="flex gap-2 flex-col justify-start ">
                <div className="flex justify-start font-semibold items-center text-xs">
                  <HiMail className="text-[#0382BD] mr-1 text-xl lg:text-lg" />
                  Email{" "}
                </div>
                <span className="text-[0.68rem] text-afruna-gray">
                  {service.providerId?.email}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <Button onClick={()=>setConfirmed(true)} variant={"primary"} type="button">
            Book This Service
          </Button>
        </div>

        <ConfirmModal onConfirm={handleConfirm} isOpen={confirmed} message="Do you want to book this service?" onCancel={handleCancel} title="Book a service " key={service._id}/>
      </section>
    </>
  );
};

export default BookingsPage;
