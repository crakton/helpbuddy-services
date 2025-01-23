"use client";

import { FC, useState } from "react";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { Input } from "@/lib/utils/Input";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { imgs } from "@/constants/images";
import { RxChevronDown } from "react-icons/rx";
import { IoIosArrowUp } from "react-icons/io";
import { FaTimes } from "react-icons/fa";
import { NewsLetter } from "@/components/NewsLetter";
import Footer from "@/app/(root)/_components/Footer";

interface pageProps {}

const PaymentPage: FC<pageProps> = ({}) => {
  const [show, setShow] = useState<Boolean>(false);
  const {
    register,
    formState: { errors },
  } = useForm();
  const { push } = useRouter();
  return (
    <main className="relative">
      
      <div className="bg-white py-6 my-8 max-w-[95%] lg:pt-16 w-full md:max-w-[80%] lg:max-w-[90%] xl:max-w-[80%] rounded-xl mx-auto flex justify-start px-3 sm:px-8 flex-col lg:flex-row gap-8">
        <div className="flex flex-col gap-3 lg:w-[60%] lg:pl-8">
          <h3 className="text-lg font-semibold">Payment Method</h3>
          <p className="text-sm font-medium text-[#545454]">
            All transactions are secure and encrypted.
          </p>

          <RadioGroup.Root
            defaultValue="Credit Card"
            aria-label="View density"
            value={undefined}
            onValueChange={(value) => console.log(value)}
            className="flex flex-col mt-4 gap-4 lg:w-[90%]"
          >
            <div className="flex flex-col gap-3">
              <div className="flex flex-col">
                <div className="flex justify-between items-center lg:px-4">
                  <div className="flex items-center gap-2">
                    <RadioGroup.Item
                      className="bg-white w-[20px] h-[20px] rounded-full border border-afruna-blue hover:bg- focus: outline-none cursor-default"
                      value="Credit Card"
                      id="r1"
                    >
                      <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[8px] after:h-[8px] after:rounded-[50%] after:bg-afruna-blue" />
                    </RadioGroup.Item>
                    <label
                      className=" text-[#0C0E3B] text-sm leading-none"
                      htmlFor="r1"
                    >
                      Credit Card
                    </label>
                  </div>
                  <div className="hidden sm:flex gap-1 items-center justify-end">
                    <div className="w-[2.8rem] h-[1.8rem] overflow-hidden relative rounded-sm flex justify-center items-center">
                      <Image src={imgs.visa} alt="partner" priority fill />
                    </div>
                    <div className="w-[2.8rem] h-[1.8rem] overflow-hidden relative rounded-sm flex justify-center items-center">
                      <Image
                        src={imgs.mastercard}
                        alt="partner"
                        priority
                        fill
                      />
                    </div>
                    <div className="w-[2.8rem] h-[1.8rem] overflow-hidden relative rounded-sm flex justify-center items-center">
                      <Image
                        src={imgs.afrunacard}
                        alt="partner"
                        priority
                        fill
                      />
                    </div>
                    {/* kelvin@www.zerotechagency.com */}
                  </div>
                </div>
                <div className="w-full h-[1px] mt-3 bg-slate-300" />
              </div>
              <form className="flex flex-col gap-y-3 mb-2 lg:pl-4 lg:pr-8">
                <Input
                  label="Card number"
                  id="card_number"
                  type={"text"}
                  placeholder="2374-4767-"
                  errors={errors}
                  register={register}
                  className="px-3 py-2.5"
                />
                <Input
                  label="Name on card"
                  id="card_name"
                  type={"text"}
                  placeholder="Enter the card name"
                  errors={errors}
                  register={register}
                  className="px-2.5 py-2.5"
                />
                <div className="flex flex-col lg:flex-row gap-x-8 lg:gap-x-4 gap-y-3 ">
                  <Input
                    label="Expiration date"
                    id="date"
                    type={"text"}
                    placeholder="MM/YY"
                    errors={errors}
                    register={register}
                    className="px-3 py-2.5"
                  />
                  <Input
                    label="CV"
                    id="cv"
                    type={"text"}
                    placeholder="123"
                    errors={errors}
                    register={register}
                    className="px-2.5 py-2.5"
                  />
                </div>
              </form>
            </div>

            <div className="flex flex-col ">
              <div className="flex items-center gap-2 lg:px-4">
                <RadioGroup.Item
                  className="bg-white w-[20px] h-[20px]  rounded-full border border-afruna-blue hover:bg- focus: outline-none cursor-default"
                  value="Pay on Delivery"
                  id="r2"
                >
                  <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[8px] after:h-[8px] after:rounded-[50%] after:bg-afruna-blue" />
                </RadioGroup.Item>
                <label
                  className=" text-[#0C0E3B] text-sm leading-none"
                  htmlFor="r2"
                >
                  Pay on Delivery
                </label>
              </div>
              <div className="w-full h-[1px] mt-3 bg-slate-300" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2 lg:px-4">
                <RadioGroup.Item
                  className="bg-white w-[20px] h-[20px]  rounded-full border border-afruna-blue hover:bg- focus: outline-none cursor-default"
                  value="Wallet"
                  id="r3"
                >
                  <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[8px] after:h-[8px] after:rounded-[50%] after:bg-afruna-blue" />
                </RadioGroup.Item>
                <label
                  className=" text-[#0C0E3B] text-sm leading-none"
                  htmlFor="r3"
                >
                  Wallet
                </label>
              </div>
              <div className="w-full h-[1px] mt-3 bg-slate-300" />
            </div>
          </RadioGroup.Root>
          {/* Error message for pay method */}
          {/* {error && (
                    <span className="text-rose-500 block text-xs bg-white rounded-sm w-fit mt-1">
                      {error}
                    </span>
                  )} */}
        </div>
        <div className="hidden sm:flex flex-col gap-3 lg:w-[40%]">
          <h3 className="text-lg font-semibold">Booking summary</h3>
          <div className="bg-[#F7FAFC] flex flex-col gap-3 p-4 rounded-xl">
            <div className="bg-white p-4 rounded-lg">
              <h4 className="text-sm lg:text-base tracking-tight text-[#505050]">
                Have a coupon?
              </h4>
              <form className="max-w-[27rem] mx-auto mt-1 rounded-md border border-[#D3D3D3] overflow-hidden flex justify-center items-center">
                <input
                  type="text"
                  placeholder="Add coupon"
                  disabled={true}
                  className="w-full px-2 py-1 tracking-tight bg-white h-full placeholder:text-[#D3D3D3]"
                />
                {/* <div className="ring-2 ring-blue-800 w-fit"> */}
                <button
                  title="Comming feature"
                  className="px-8 py-2 tracking-tight text-white bg-gradient-to-b from-blue-400 to-blue-900 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-800 transition duration-500"
                >
                  Apply
                </button>
                {/* </div> */}
              </form>
            </div>

            <div className="bg-white rounded-lg p-4 pb-6 flex flex-col gap-3">
              <div className="flex justify-between pt-4 items-center">
                <span className="w-fit text-sm  lg:text-base tracking-tight text-[#505050]">
                  Date:
                </span>
                <span className="w-fit text-sm lg:text-base tracking-tight text-[#505050]">
                  {`09/09/2023`}
                </span>
              </div>
              <div className="flex justify-between pt-4 items-center">
                <span className="w-fit text-sm  lg:text-base tracking-tight text-[#505050]">
                  Time:
                </span>
                <span className="w-fit text-sm lg:text-base tracking-tight text-[#505050]">
                  12 : 45 PM
                </span>
              </div>
              <div className="flex justify-between pt-4 items-center">
                <span className="w-fit text-sm  lg:text-base tracking-tight text-[#505050]">
                  Service Type:
                </span>
                <span className="w-fit text-sm lg:text-base tracking-tight text-[#505050]">
                  Video/Image Edit
                </span>
              </div>
              <div className="flex justify-between pt-4 items-center">
                <span className="w-fit text-sm  lg:text-base tracking-tight text-[#505050]">
                  Service Provider:
                </span>
                <span className="w-fit text-sm lg:text-base tracking-tight text-[#505050]">
                  Martined Roy
                </span>
              </div>
              <div className="flex justify-between pt-4 items-center">
                <span className="w-fit text-sm  lg:text-base tracking-tight text-[#505050]">
                  Subtotal:
                </span>
                <span className="w-fit text-sm lg:text-base tracking-tight text-[#505050]">
                  $1403.97
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="w-fit text-smlg:text-base tracking-tight text-[#505050]">
                  Coupon Discount:
                </span>
                <span className="w-fit lg:text-base text-sm tracking-tight text-[#FA3434]">
                  -$60.07
                </span>
              </div>
              <div className="flex justify-between pt-4 items-center">
                <span className="w-fit text-sm  lg:text-base tracking-tight text-[#505050]">
                  Service Charge:
                </span>
                <span className="w-fit text-sm lg:text-base tracking-tight text-[#505050]">
                  $3245
                </span>
              </div>
              <div className="border-b border-slate-300 h-[1px] w-full" />
              <div className="flex justify-between mt-3 items-center">
                <span className="w-fit font-semibold tracking-tight">
                  Total:
                </span>
                <span className="w-fit font-semibold lg:text-xl tracking-tight">
                  {`#4532.00`}
                </span>
              </div>
              <Button
                variant={"primary"}
                onClick={() => push("")}
                className="mt-4 text-sm hover:scale-95 transition duration-300 rounded-md"
              >
                Procced to Pay #4532.00
              </Button>
            </div>
          </div>
        </div>


        <div className="fixed bottom-0 block sm:hidden left-2 right-2 rounded-lg">
          <div className="w-full bg-white flex flex-col gap-4 ">
            <div
              className={`${
                show ? "block" : "hidden"
              } flex flex-col gap-2 pt-3`}
            >
              <div className="flex justify-end mr-4">
                <button
                  onClick={() => {
                    show ? setShow(false) : setShow(true);
                  }}
                  className=""
                >
                  <FaTimes className="text-xl" />
                </button>
              </div>

              <div className="bg-[#F7FAFC] flex flex-col gap-2 p-4 rounded-xl">
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="text-sm lg:text-base tracking-tight text-[#505050]">
                    Have a coupon?
                  </h4>
                  <form className="max-w-[27rem] mx-auto mt-1 rounded-md border border-[#D3D3D3] overflow-hidden flex justify-center items-center">
                    <input
                      type="text"
                      placeholder="Add coupon"
                      disabled={true}
                      className="w-full px-2 py-1 text-sm tracking-tight bg-white h-full placeholder:text-[#D3D3D3]"
                    />
                    {/* <div className="ring-2 ring-blue-800 w-fit"> */}
                    <button
                      title="Comming feature"
                      className="px-8 py-2 text-sm tracking-tight text-white bg-gradient-to-b from-blue-400 to-blue-900 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-800 transition duration-500"
                    >
                      Apply
                    </button>
                    {/* </div> */}
                  </form>
                </div>

                <div className="bg-white rounded-lg p-4 flex flex-col gap-1">
                  <div className="flex justify-between pt-1 items-center">
                    <span className="w-fit text-sm  lg:text-base tracking-tight text-[#505050]">
                      Date:
                    </span>
                    <span className="w-fit text-sm lg:text-base tracking-tight text-[#505050]">
                      {`09/09/2023`}
                    </span>
                  </div>
                  <div className="flex justify-between pt-1 items-center">
                    <span className="w-fit text-sm  lg:text-base tracking-tight text-[#505050]">
                      Time:
                    </span>
                    <span className="w-fit text-sm lg:text-base tracking-tight text-[#505050]">
                      12 : 45 PM
                    </span>
                  </div>
                  <div className="flex justify-between pt-1 items-center">
                    <span className="w-fit text-sm  lg:text-base tracking-tight text-[#505050]">
                      Service Type:
                    </span>
                    <span className="w-fit text-sm lg:text-base tracking-tight text-[#505050]">
                      Video/Image Edit
                    </span>
                  </div>
                  <div className="flex justify-between pt-1 items-center">
                    <span className="w-fit text-sm  lg:text-base tracking-tight text-[#505050]">
                      Service Provider:
                    </span>
                    <span className="w-fit text-sm lg:text-base tracking-tight text-[#505050]">
                      Martined Roy
                    </span>
                  </div>
                  <div className="flex justify-between pt-1 items-center">
                    <span className="w-fit text-sm  lg:text-base tracking-tight text-[#505050]">
                      Subtotal:
                    </span>
                    <span className="w-fit text-sm lg:text-base tracking-tight text-[#505050]">
                      $1403.97
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="w-fit text-sm  tracking-tight text-[#505050]">
                      Coupon Discount:
                    </span>
                    <span className="w-fit text-sm tracking-tight text-[#FA3434]">
                      -$60.07
                    </span>
                  </div>
                  <div className="flex justify-between pt-1 items-center">
                    <span className="w-fit text-sm tracking-tight text-[#505050]">
                      Service Charge:
                    </span>
                    <span className="w-fit text-sm  tracking-tight text-[#505050]">
                      $3245
                    </span>
                  </div>
                  <div className="border-b border-slate-300 h-[1px] w-full" />
                  <div className="flex justify-between mt-1 items-center">
                    <span className="w-fit font-semibold tracking-tight">
                      Total:
                    </span>
                    <span className="w-fit font-semibold lg:text-xl tracking-tight">
                      {`#4532.00`}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex border-t border-slate-300 flex-col gap-5 py-2 justify-center items-center">
              <div className="flex justify-center items-center font-semibold">
                <button
                  onClick={() => {
                    show ? setShow(false) : setShow(true);
                  }}
                  className="flex gap-2 items-center"
                >
                  Summary{" "}
                  <IoIosArrowUp
                    className={`${
                      show ? "rotate-180" : "rotate-0"
                    } transition ease-in duration-200 w-6 h-6`}
                  />
                </button>
              </div>
              <Button
                variant={"primary"}
                onClick={() => push("")}
                className=" text-sm hover:scale-95 transition duration-300 rounded-md"
              >
                Procced to Pay #4532.00
              </Button>
            </div>
            
          </div>
        </div>
        
      </div>

      

    </main>
  );
};

export default PaymentPage
