// "use client";

// import AddReviewModel from "@/components/AddReviewModel";
// import { Button } from "@/components/ui/button";
// import { imgs } from "@/constants/images";
// import {
// } from "@/interfaces";
// import axios from "axios";
// import getSymbolFromCurrency from "currency-symbol-map";
// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { FC, useCallback, useMemo, useState } from "react";
// import Cookies from "js-cookie";
// // import {
// //   BsFillChatLeftTextFill,
// //   BsStar,
// //   BsStarFill,
// //   BsStarHalf,
// // } from "react-icons/bs";
// import { toast } from "react-toastify";
// import NoThingFound from "@/components/ui/NothingFound";
// import { verifyImageUrl } from "@/utils/verify_image_url";
// import ConfirmModal from "@/components/ui/ConfirmModal";

// interface pageProps {}

// const BookingsPage: FC<pageProps> = ({}) => {
//   const router = useRouter();
//   const [openDelete, setOpenDelete] = useState<boolean>(false);
//   const [openReview, setOpenReview] = useState<boolean>(false);
//   const handlePayment = useCallback(
//     async (bookingId: string) => {
//       try {
//         const res = await axios.post<{
//           success: boolean;
//           message: string;
//           data: {
//             authorization_url: string;
//             access_code: string;
//             reference: string;
//           };
//         }>(
//           "/api/transactions/service",
//           { bookingId: bookingId },
//           {
//             headers: {
//               Authorization: `Bearer ${Cookies.get("token")}`,
//             },
//           }
//         );
//         window.location.replace(res.data.data.authorization_url);
//       } catch (error) {
//         toast.warn("Payment failed");
//         router.replace("/bookings");
//       }
//     },
//     [router]
//   );

//   const handleDeletedBooking = useCallback(() => {
//     setOpenDelete(true);
//   }, []);
//   // const handleReBooking = useCallback(
//   //   async (payload: {
//   //     amount: number;
//   //     location: string;
//   //     serviceId: string;
//   //   }) => {
//   //     await makeBooking(payload);

//   //     if (bookingResponse.isError) {
//   //       toast.warn("Booking failed, try again!");
//   //     } else {
//   //       if (bookingResponse.isSuccess) {
//   //         toast.info("Confirmed! Redirecting to payment");
//   //         const bookingData = bookingResponse.data?.data;
//   //         try {
//   //           const res = await axios.post<{
//   //             success: boolean;
//   //             message: string;
//   //             data: {
//   //               authorization_url: string;
//   //               access_code: string;
//   //               reference: string;
//   //             };
//   //           }>(
//   //             "/api/transactions/service?url=localhost:3000/bookings",
//   //             { bookingId: bookingData?._id },
//   //             {
//   //               headers: {
//   //                 Authorization: `Bearer ${Cookies.get("token")}`,
//   //               },
//   //             }
//   //           );
//   //           window.location.replace(res.data.data.authorization_url);
//   //         } catch (error) {
//   //           toast.warn("Payment failed");
//   //           router.replace("/bookings");
//   //         }
//   //       }
//   //     }
//   //   },
//   //   [
//   //     makeBooking,
//   //     bookingResponse.isError,
//   //     bookingResponse.isSuccess,
//   //     bookingResponse.data?.data,
//   //     router,
//   //   ]
//   // );
//   //get valild bookings
//   // const validBookings = useMemo(() => {
//   //   if (isSuccess) {
//   //     return data.data.filter((booking) => booking.serviceId !== null);
//   //   }
//   //   return [];
//   // }, [data?.data, isSuccess]);

//   return (
//     <section className="flex flex-col gap-6 max-w-[94%] md:max-w-[100%] mx-auto">
//       <h1 className="text-xl pl-2 lg:pl-0 lg:text-2xl leading-3 text-afruna-blue font-bold">
//         Bookings
//       </h1>
//       <div className="flex flex-col gap-4 max-w-[95%] lg:max-w-[100%] mx-auto w-full">
//         {/* Booking
//         {validBookings.length > 0 ? (
//           validBookings.map((booking) => { 
//             // var providerDetails: IUser;
//             // var categoryDetails:ICategory;
//             // var serviceDetails:IService;

//             // axios.get<IUserResponse>(`/api/users/${booking.providerId}`).then(res => providerDetails = res.data.data);
//             // axios.get<IServiceResponse>(`/api/services/${booking.serviceId}`).then(res => serviceDetails = res.data.data);

//             return (
//               <div
//                 key={booking._id}
//                 className="py-6 px-8 lg:max-w-[90%] flex flex-col lg:gap-8 lg:flex-row justify-between w-full bg-white drop-shadow rounded-lg"
//               >
//                 <div className="flex flex-col items-center sm:flex-row lg:max-w-[75%] w-full gap-6">
//                   <div className="flex justify-center items-center w-full h-[12rem] sm:w-[13rem] sm:h-[9rem]">
//                     <div className="w-full h-full overflow-hidden relative rounded-md">
//                       <Image
//                         src={verifyImageUrl(booking.serviceId.photos[0])}
//                         // src={booking.serviceId.photos[0] ?? imgs.review1}
//                         alt="review"
//                         priority
//                         fill
//                       />
//                     </div>
//                   </div>
//                   <div className="flex flex-col justify-start gap-4  w-full">
//                     <div className="flex justify-start items-center gap-2">
//                       <span className="lg:max-w-[27%] w-full text-sm md:text-md text-black font-bold">
//                         {booking.serviceId.name}
//                       </span>
//                       <span className="sm:text-sm flex justify-end lg:justify-start text-[0.65rem] lg:max-w-[73%] w-full text-afruna-gray">
//                         <p
//                           className={`${
//                             booking.status === "cancelled" &&
//                             "bg-rose-100 text-red-700/80"
//                           } ${
//                             booking.status === "pending" &&
//                             "bg-orange-100 text-orange-700/80"
//                           } ${
//                             booking.status === "in progress" &&
//                             "bg-blue-100 text-blue-700/80"
//                           } ${
//                             booking.status === "completed" &&
//                             "bg-green-100 text-green-700/80"
//                           } px-2 py-1 w-fit `}
//                         >
//                           {booking.status}
//                         </p>
//                       </span>
//                     </div>
//                     <div className="flex justify-start items-center gap-2">
//                       <span className="text-xs  lg:max-w-[27%] w-full text-black font-bold">
//                         Booking Date
//                       </span>
//                       <span className="text-xs text-end lg:text-start lg:max-w-[73%] w-full text-[#787878]">
//                         {new Date(booking.createdAt).toUTCString()}
//                       </span>
//                     </div>
//                     <div className="flex justify-start items-center gap-2">
//                       <span className="text-xs  lg:max-w-[27%] w-full text-black font-bold">
//                         Account
//                       </span>
//                       <span className="text-xs text-end lg:text-start lg:max-w-[73%] w-full text-[#787878]">
//                         {getSymbolFromCurrency("NGN")}
//                         {booking.amount.toLocaleString()}
//                       </span>
//                     </div>
//                     <div className="flex justify-start items-center gap-2">
//                       <span className="text-xs lg:max-w-[27%] w-full text-afruna-blue font-bold">
//                         Location
//                       </span>
//                       <span className="text-xs text-end lg:text-start lg:max-w-[73%] w-full text-[#787878]">
//                         {booking.location}
//                       </span>
//                     </div>
//                     <div className="flex justify-start items-center gap-2">
//                       <span className="lg:max-w-[27%] sm:text-xs w-full text-black font-bold">
//                         Provider
//                       </span>
//                       <div className="flex flex-col lg:flex-row gap-2 lg:items-center lg:justify-start justify-end items-end lg:text-start lg:max-w-[73%] w-full">
//                         <div className="flex items-center gap-1">
//                           <div className="w-[1.3rem] h-[1.3rem] sm:w-[2rem] sm:h-[2rem] overflow-hidden rounded-full relative flex justify-center items-center">
//                             <Image
//                               src={verifyImageUrl(booking.providerId.avatar)}
//                               alt="review"
//                               priority
//                               fill
//                             />
//                           </div>
//                           <span className="sm:text-xs text-[0.65rem] capitalize text-slate-600">
//                             {booking.providerId.firstName}{" "}
//                             {booking.providerId.lastName}
//                           </span>
//                         </div>
//                         <span className="sm:text-xs text-[0.65rem] text-[#787878]">
//                           {booking.providerId.email}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {booking.status === "in progress" && (
//                   <div className="flex justify-center mt-7 md:mt-0 sm:justify-start items-center gap-4 lg:max-w-[25%] w-full">
//                     <Button
//                       onClick={() => {
//                         router.push(`/chat/${booking.providerId._id}`);
//                       }}
//                       variant={"primary"}
//                       className="px-5 text-xs"
//                     >
//                       Chat
//                     </Button>
//                   </div>
//                 )}

//                 {booking.status === "pending" && (
//                   <div className="flex justify-center mt-7 md:mt-0 sm:justify-start items-center gap-4 lg:max-w-[25%] w-full">
//                     <Button
//                       onClick={() => {
//                         router.push(`/chat/${booking.providerId._id}`);
//                       }}
//                       variant={"primary"}
//                       className="px-5 text-xs"
//                     >
//                       Chat
//                     </Button>
                  
//                     <Button variant={"skyButton"} className="text-xs">
//                       Cancel
//                     </Button>
//                   </div>
//                 )}
//                 {booking.status === "cancelled" && (
//                   <div className="flex justify-center mt-7 md:mt-0 sm:justify-start items-center gap-4 lg:max-w-[25%] w-full">
//                     <Button
//                       onClick={() =>
//                         handleReBooking({
//                           amount: booking.amount,
//                           location: booking.location,
//                           serviceId: booking.serviceId._id,
//                         })
//                       }
//                       variant={"primary"}
//                       className="px-5 text-xs"
//                     >
//                       Re Book
//                     </Button>
//                     {/* <Button variant={"skyButton"} className="text-xs">
//                       Reschedule
//                     </Button> */}
//                   </div>
//                 )}
//                 {booking.status === "completed" && (
//                   <div className="flex justify-center mt-7 md:mt-0 sm:justify-start items-center gap-4 lg:max-w-[25%] w-full">
//                     <Button
//                       onClick={() =>
//                         handleReBooking({
//                           amount: booking.amount,
//                           location: booking.location,
//                           serviceId: booking.serviceId._id,
//                         })
//                       }
//                       variant={"primary"}
//                       className="px-5 text-xs"
//                     >
//                       Re Book
//                     </Button>
//                     <Button
//                       onClick={() => {
//                         setOpenReview(true);
//                       }}
//                       variant={"skyButton"}
//                       className="text-xs"
//                     >
//                       Add Review
//                     </Button>
//                   </div>
//                 )}
//                 <AddReviewModel
//                   bookingObj={booking}
//                   isOpen={openReview}
//                   onClose={() => setOpenReview(false)}
//                 />
//               </div>
//             );
//           })
//         ) : (
//           <NoThingFound message="No history on bookings" />
//         )}
//         {/* Booking */}
//         {/* <div className="py-6 px-8 lg:max-w-[90%] flex flex-col lg:gap-8 lg:flex-row justify-between w-full bg-white drop-shadow rounded-lg">
//           <div className="flex flex-col items-center sm:flex-row lg:max-w-[75%] w-full gap-6">
//             <div className="flex justify-center items-center w-full h-[12rem] sm:w-[13rem] sm:h-[9rem]">
//               <div className="w-full h-full overflow-hidden relative rounded-md">
//                 <Image src={imgs.review1} alt="review" priority fill />
//               </div>
//             </div>
//             <div className="flex flex-col justify-start gap-4  w-full">
//               <div className="flex justify-start items-center gap-2">
//                 <span className="lg:max-w-[27%] w-full text-black font-bold">
//                   Video Editing
//                 </span>
//                 <span className="sm:text-sm flex justify-end lg:justify-start text-[0.65rem] lg:max-w-[73%] w-full text-afruna-gray">
//                   <p className="bg-green-100 text-green-700 px-2 py-1 w-fit ">
//                     Completed
//                   </p>
//                 </span>
//               </div>
//               <div className="flex justify-start items-center gap-2">
//                 <span className="text-xs  lg:max-w-[27%] w-full text-black font-bold">
//                   Booking Date
//                 </span>
//                 <span className="text-xs text-end lg:text-start lg:max-w-[73%] w-full text-[#787878]">
//                   :January 23, 2023
//                 </span>
//               </div>
//               <div className="flex justify-start items-center gap-2">
//                 <span className="text-xs  lg:max-w-[27%] w-full text-black font-bold">
//                   Account
//                 </span>
//                 <span className="text-xs text-end lg:text-start lg:max-w-[73%] w-full text-[#787878]">
//                   :#1432.00
//                 </span>
//               </div>
//               <div className="flex justify-start items-center gap-2">
//                 <span className="text-xs lg:max-w-[27%] w-full text-afruna-blue font-bold">
//                   Location
//                 </span>
//                 <span className="text-xs text-end lg:text-start lg:max-w-[73%] w-full text-[#787878]">
//                   :Kaduna
//                 </span>
//               </div>
//               <div className="flex justify-start items-center gap-2">
//                 <span className="lg:max-w-[27%] sm:text-xs w-full text-black font-bold">
//                   Provider
//                 </span>
//                 <div className="flex flex-col lg:flex-row gap-2 lg:items-center lg:justify-start justify-end items-end lg:text-start lg:max-w-[73%] w-full">
//                   <div className="flex items-center gap-1">
//                     <div className="w-[1.3rem] h-[1.3rem] sm:w-[2rem] sm:h-[2rem] overflow-hidden rounded-full relative flex justify-center items-center">
//                       <Image src={imgs.seller1} alt="review" priority fill />
//                     </div>
//                     <span className="sm:text-xs text-[0.65rem] text-slate-600">
//                       Jahimani Masilala
//                     </span>
//                   </div>
//                   <span className="sm:text-xs text-[0.65rem] text-[#787878]">
//                     jahimani@gmail.com
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="flex flex-col gap-6 justify-center text-center">
//             <div className="flex justify-center mt-7 md:mt-0 sm:justify-start items-center gap-4 lg:max-w-[25%] w-full">
//               <Button variant={"primary"} className="px-5 text-xs">
//                 Re Book
//               </Button>
//               <Button variant={"skyButton"} className="text-xs" onClick={() => {
//                 console.log('clikd');
//                 setOpen(true)
                
//               }}>
//                 Add review
//               </Button>
//               <AddReviewModel isOpen={open} onClose={() => setOpen(false)} />
//             </div>
//             <div className="flex justify-center items-center gap-2 ">
//               {Array(5)
//                 .fill("_")
//                 .map((star, index) => (
//                   <div
//                     className={`${
//                       index < 4.5 ? "text-[#FF9E3A]" : "text-slate-400"
//                     }  text-sm md:text-xs`}
//                     key={index}
//                   >
//                     {index < 4.5 ? (
//                       index === Math.floor(4.5) && 4.5 % 1 !== 0 ? (
//                         <BsStarHalf />
//                       ) : (
//                         <BsStarFill />
//                       )
//                     ) : (
//                       <BsStar />
//                     )}
//                   </div>
//                 ))}
//             </div>
//             <Link href={""} className="text-xs text-sky-300 w-fit mx-auto ">
//               View details
//             </Link>
//           </div>
//         </div> */}
//         {/* Booking */}
//         {/* <div className="py-6 px-8 lg:max-w-[90%] flex flex-col lg:gap-8 lg:flex-row justify-between w-full bg-white drop-shadow rounded-lg">
//           <div className="flex flex-col items-center sm:flex-row lg:max-w-[75%] w-full gap-6">
//             <div className="flex justify-center items-center w-full h-[12rem] sm:w-[13rem] sm:h-[9rem]">
//               <div className="w-full h-full overflow-hidden relative rounded-md">
//                 <Image src={imgs.review1} alt="review" priority fill />
//               </div>
//             </div>
//             <div className="flex flex-col justify-start gap-4  w-full">
//               <div className="flex justify-start items-center gap-2">
//                 <span className="lg:max-w-[27%] w-full text-black font-bold">
//                   Video Editing
//                 </span>
//                 <span className="sm:text-sm flex justify-end lg:justify-start text-[0.65rem] lg:max-w-[73%] w-full text-afruna-gray">
//                   <p className=" bg-purple-200 text-purple-700 px-2 py-1 w-fit ">
//                     In Progress
//                   </p>
//                 </span>
//               </div>
//               <div className="flex justify-start items-center gap-2">
//                 <span className="text-xs  lg:max-w-[27%] w-full text-black font-bold">
//                   Booking Date
//                 </span>
//                 <span className="text-xs text-end lg:text-start lg:max-w-[73%] w-full text-[#787878]">
//                   :January 23, 2023
//                 </span>
//               </div>
//               <div className="flex justify-start items-center gap-2">
//                 <span className="text-xs  lg:max-w-[27%] w-full text-black font-bold">
//                   Account
//                 </span>
//                 <span className="text-xs text-end lg:text-start lg:max-w-[73%] w-full text-[#787878]">
//                   :#1432.00
//                 </span>
//               </div>
//               <div className="flex justify-start items-center gap-2">
//                 <span className="text-xs lg:max-w-[27%] w-full text-afruna-blue font-bold">
//                   Location
//                 </span>
//                 <span className="text-xs text-end lg:text-start lg:max-w-[73%] w-full text-[#787878]">
//                   :Kaduna
//                 </span>
//               </div>
//               <div className="flex justify-start items-center gap-2">
//                 <span className="lg:max-w-[27%] sm:text-xs w-full text-black font-bold">
//                   Provider
//                 </span>
//                 <div className="flex flex-col lg:flex-row gap-2 lg:items-center lg:justify-start justify-end items-end lg:text-start lg:max-w-[73%] w-full">
//                   <div className="flex items-center gap-1">
//                     <div className="w-[1.3rem] h-[1.3rem] sm:w-[2rem] sm:h-[2rem] overflow-hidden rounded-full relative flex justify-center items-center">
//                       <Image src={imgs.seller1} alt="review" priority fill />
//                     </div>
//                     <span className="sm:text-xs text-[0.65rem] text-slate-600">
//                       Jahimani Masilala
//                     </span>
//                   </div>
//                   <span className="sm:text-xs text-[0.65rem] text-[#787878]">
//                     jahimani@gmail.com
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="flex flex-col gap-6 justify-center text-center">
//             <div className="flex justify-center mt-7 md:mt-0 sm:justify-start items-center gap-4 lg:max-w-[25%] w-full">
//               <Button variant={"primary"} className="px-5 text-xs">
//                 <BsFillChatLeftTextFill className="text-[0.8rem] mr-2 " />
//                 Chat
//               </Button>
//               <Button variant={"skyButton"} className="text-xs">
//                 Cancel
//               </Button>
//             </div>
//           </div>
//         </div> */}
//       </div>
//       <ConfirmModal
//         isOpen={openDelete}
//         title="Delete Bookings?"
//         message="Action can not be undone?"
//         onCancel={() => {}}
//         onConfirm={handleDeletedBooking}
//       />
//     </section>
//   );
// };

// export default BookingsPage;
