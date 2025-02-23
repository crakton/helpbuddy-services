"use client";

import { Button } from "@/components/ui/button";
import getSymbolFromCurrency from "currency-symbol-map";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import NoThingFound from "@/components/ui/NothingFound";
import { verifyImageUrl } from "@/utils/verify_image_url";
import ConfirmModal from "@/components/ui/ConfirmModal";
import { BsFillChatLeftTextFill, BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { useBooking } from "@/context/BookingContext";

interface pageProps {
}

const BookingsPage: FC<pageProps> = ({}) => {
  const router = useRouter();
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [openReview, setOpenReview] = useState<boolean>(false);

  const { bookings } = useBooking(); // using bookings from context

  const handleDeleteBooking = (bookingId: string) => {
    // You can call an API or handle the deletion here
    console.log(`Deleting booking with ID: ${bookingId}`);
    setOpenDelete(false);
  };


  console.log(bookings.length, )
  return (
    <section className="flex flex-col gap-6 max-w-[94%] md:max-w-[100%] mx-auto">
      <h1 className="text-xl pl-2 lg:pl-0 lg:text-2xl leading-3 text-afruna-blue font-bold">
        Bookings
      </h1>
      <div className="flex flex-col gap-4 max-w-[95%] lg:max-w-[100%] mx-auto w-full">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <div
              key={booking.$id}
              className="py-6 px-8 lg:max-w-[90%] flex flex-col lg:gap-8 lg:flex-row justify-between w-full bg-white drop-shadow rounded-lg"
            >
              <div className="flex flex-col items-center sm:flex-row lg:max-w-[75%] w-full gap-6">
                <div className="flex justify-center items-center w-full h-[12rem] sm:w-[13rem] sm:h-[9rem]">
                  <div className="w-full h-full overflow-hidden relative rounded-md">
                    <Image
                      src={verifyImageUrl(booking.images[0])}
                      alt="review"
                      priority
                      fill
                    />
                  </div>
                </div>
                <div className="flex flex-col justify-start gap-4 w-full">
                  <div className="flex justify-start items-center gap-2">
                    <span className="lg:max-w-[27%] w-full text-sm md:text-md text-black font-bold">
                      {booking.name}
                    </span>
                    <span className="sm:text-sm flex justify-end lg:justify-start text-[0.65rem] lg:max-w-[73%] w-full text-afruna-gray">
                      <p
                        className={`${
                          booking.status === "cancelled" && "bg-rose-100 text-red-700/80"
                        } ${booking.status === "pending" && "bg-orange-100 text-orange-700/80"} ${
                          booking.status === "in progress" && "bg-blue-100 text-blue-700/80"
                        } ${booking.status === "completed" && "bg-green-100 text-green-700/80"} px-2 py-1 w-fit `}
                      >
                        {booking.status}
                      </p>
                    </span>
                  </div>
                  <div className="flex justify-start items-center gap-2">
                    <span className="text-xs lg:max-w-[27%] w-full text-black font-bold">
                      Booking Date
                    </span>
                    {/* <span className="text-xs text-end lg:text-start lg:max-w-[73%] w-full text-[#787878]">
                      {format(new Date(booking.createdAt), "PPPp")}
                    </span> */}
                  </div>
                  <div className="flex justify-start items-center gap-2">
                    <span className="text-xs lg:max-w-[27%] w-full text-black font-bold">
                      Account
                    </span>
                    <span className="text-xs text-end lg:text-start lg:max-w-[73%] w-full text-[#787878]">
                      {getSymbolFromCurrency("NGN")}
                      {booking.price.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-start items-center gap-2">
                    <span className="text-xs lg:max-w-[27%] w-full text-afruna-blue font-bold">
                      Location
                    </span>
                    <span className="text-xs text-end lg:text-start lg:max-w-[73%] w-full text-[#787878]">
                      {booking.location}
                    </span>
                  </div>
                  <div className="flex justify-start items-center gap-2">
                    <span className="lg:max-w-[27%] sm:text-xs w-full text-black font-bold">
                      Provider
                    </span>
                    {/* <div className="flex flex-col lg:flex-row gap-2 lg:items-center lg:justify-start justify-end items-end lg:text-start lg:max-w-[73%] w-full">
                      <div className="flex items-center gap-1">
                        <div className="w-[1.3rem] h-[1.3rem] sm:w-[2rem] sm:h-[2rem] overflow-hidden rounded-full relative flex justify-center items-center">
                          <Image src={booking?.providerId?.avatar} alt="provider" priority fill />
                        </div>
                        <span className="sm:text-xs text-[0.65rem] text-slate-600">
                          {booking?.providerId?.name}
                        </span>
                      </div>
                      <span className="sm:text-xs text-[0.65rem] text-[#787878]">
                        {booking?.providerId.email}
                      </span>
                    </div> */}
                  </div>
                </div>
              </div>

              {/* Action buttons based on status */}
              <div className="flex justify-center mt-7 md:mt-0 sm:justify-start items-center gap-4 lg:max-w-[25%] w-full">
                {booking.status === "in progress" && (
                  <Button
                    onClick={() => router.push(`/chat/${booking?.providerId._id}`)}
                    variant="primary"
                    className="px-5 text-xs"
                  >
                    Chat
                  </Button>
                )}
                {booking.status === "pending" && (
                  <>
                    <Button
                      onClick={() => router.push(`/chat/${booking?.providerId._id}`)}
                      variant="primary"
                      className="px-5 text-xs"
                    >
                      Chat
                    </Button>
                    <Button variant="skyButton" className="text-xs">
                      Cancel
                    </Button>
                  </>
                )}
                {booking.status === "cancelled" && (
                  <Button variant="primary" className="px-5 text-xs">
                    Re Book
                  </Button>
                )}
                {booking.status === "completed" && (
                  <>
                    <Button variant="primary" className="px-5 text-xs">
                      Re Book
                    </Button>
                    <Button
                      onClick={() => setOpenReview(true)}
                      variant="skyButton"
                      className="text-xs"
                    >
                      Add Review
                    </Button>
                  </>
                )}
              </div>

              {/* AddReviewModel component */}
              {/* {openReview && (
                <AddReviewModel
                  bookingObj={booking}
                  isOpen={openReview}
                  onClose={() => setOpenReview(false)}
                />
              )} */}
            </div>
          ))
        ) : (
          <NoThingFound message="No history on bookings" />
        )}

        {/* Confirm Delete Modal */}
        <ConfirmModal
          isOpen={openDelete}
          title="Delete Booking?"
          message="This action cannot be undone."
          onCancel={() => setOpenDelete(false)}
          onConfirm={() => handleDeleteBooking("booking_id")}
        />
      </div>
    </section>
  );
};

export default BookingsPage;
