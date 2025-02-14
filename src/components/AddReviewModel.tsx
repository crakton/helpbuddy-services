// "use client";

// import { FC, useCallback, useRef, useState } from "react";
// import { Model } from "./Model";
// import Image from "next/image";
// import { imgs } from "@/constants/images";
// import { Button } from "./ui/button";
// import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
// import { FieldValue } from "react-hook-form";
// import { IBooking } from "@/interfaces";
// import { Loader, Loader2 } from "lucide-react";
// import { useRouter } from "next/navigation";

// interface AddReviewModelProps {
//   isOpen: boolean;
//   onClose: () => void;
//   bookingObj: IBooking;
// }



// const AddReviewModel: FC<AddReviewModelProps> = ({
//   isOpen,
//   onClose,
//   bookingObj,
// }) => {
//   const { push } = useRouter();
//   const [rating, setRating] = useState<number>(0);
//   const [comment, setComment] = useState<string>("");
//   const textareaRef = useRef<HTMLTextAreaElement | null>(null);
//   const starRef = useRef<HTMLSpanElement | null>(null);



 


//   const handleStarClick = useCallback(
//     (index: number) => {
//       if (rating === 0) {
//         setRating(index + 1 * 0.5);
//       } else if (rating === index + 1) {
//         setRating(rating - 1);
//       } else if (rating % 1) {
//         setRating(index + 1);
//       } else {
//         setRating(index + 1 * 0.5);
//       }
//     },
//     [rating]
//   );

//   return (
//     <Model isOpen={isOpen} onclose={onClose} rootClassName="md:max-w-[35rem]">
//       <main className="flex flex-col gap-6 justify-start items-start w-full px-6 xl:px-12">
//         <h2 className="text-lg font-semibold lg:text-2xl">Write a Review</h2>
//         <div className="flex flex-col gap-4 sm:gap-6 sm:flex-row">
//           <div className="flex justify-center items-center w-fit">
//             <div className="w-[10rem] h-[6.5rem] overflow-hidden relative rounded-md">
//               <Image
//                 src={ imgs.review1}
//                 alt="review"
//                 priority
//                 fill
//               />
//             </div>
//           </div>
//           <div className="flex flex-col gap-2 sm:mt-4 justify-start items-start">
//             <h3 className="font-semibold text-afruna-blue">
//               Electrical 
//             </h3>
//             <p className="font-semibold text-sm capitalize text-afruna-gray">
//               {bookingObj.location}
//             </p>
//           </div>
//         </div>
//         <form className="flex flex-col gap-4 w-full">
//           <div className="flex flex-col gap-1 justify-start items-start">
//             <span className="text-sm font-semibold">Rate This Service</span>
//             <div>
//               <div className="flex mt-1 justify-start items-center gap-1 text-[#FF9E3A] text-xs">
//                 {Array(5)
//                   .fill("_")
//                   .map((star, index) => (
//                     <div
//                       className={`${
//                         index < rating ? "text-[#FF9E3A]" : "text-slate-500"
//                       }  text-sm md:text-xs cursor-pointer`}
//                       key={index}
//                       onClick={() => handleStarClick(index)}
//                     >
//                       {index < rating ? (
//                         index === Math.floor(rating) && rating % 1 !== 0 ? (
//                           <BsStarHalf />
//                         ) : (
//                           <BsStarFill />
//                         )
//                       ) : (
//                         <BsStar />
//                       )}
//                     </div>
//                   ))}
//               </div>
//               {rating === 0 && (
//                 <span
//                   ref={starRef}
//                   className="text-rose-500 block text-xs mt-1 bg-white rounded-sm w-fit"
//                 ></span>
//               )}
//             </div>
//           </div>
//           <fieldset className="w-full mt-1 flex flex-col gap-1 justify-start items-start">
//             <label className="text-sm font-semibold">Write your review</label>
//             <div className="flex flex-col w-full mt-1">
//               <textarea
//                 rows={5}
//                 value={comment}
//                 //   ref={textareaRef}
//                 onChange={(e) => setComment(e.target.value)}
//                 onKeyDown={(e) => {
//                   if (e.key === "Enter" && !e.shiftKey) {
//                     e.preventDefault();
            
//                   }
//                 }}
//                 placeholder="Enter your coment ..."
//                 style={{ resize: "none" }}
//                 className="p-2 w-full bg-slate-100 placeholder:text-gray-400 text-xs border border-slate-300 rounded-md"
//               />
//               {comment === "" && (
//                 <span
//                   ref={textareaRef}
//                   className="text-rose-500 block text-xs bg-white rounded-sm w-fit mt-1"
//                 ></span>
//               )}
//             </div>
//           </fieldset>
//           <div className="mt-4 mb-8 flex sm:justify-end w-full">
//             <Button
     
           
//               type="button"
//               variant={"primary"}
//               className="flex gap-3 justify-center items-center rounded-md w-full max-w-[6rem]"
//             >
           
//                 <Loader
//                   speed={300}
//                   className="spin-in-3 animate-spin animate"
//                 />
          
//               Send
//             </Button>
//           </div>
//         </form>
//       </main>
//     </Model>
//   );
// };

// export default AddReviewModel;
