"use client";

import { imgs } from "@/constants/images";
import Image from "next/image";
import { FC, useState } from "react";

interface pageProps {}

const ScannarPage: FC<pageProps> = ({}) => {
  const [show, setShow] = useState<Boolean>(false);
  return (
    <main className="pt-10 pb-8 w-full flex flex-col justify-center items-center gap-4">
      {!show ? (
        <>
          <div onClick={() => setShow(true)} className="w-[15rem] h-[15rem] overflow-hidden relative rounded-lg flex justify-center items-center">
            <Image src={imgs.QRcode} alt="partner" priority fill />
          </div>
          <div className="flex gap-3 justify-center items-center">
            <div
              onClick={() => setShow(true)}
              className="w-[3rem] h-[3rem] overflow-hidden relative rounded-full flex justify-center items-center"
            >
              <Image src={imgs.cam1} alt="partner" priority fill />
            </div>
            <div 
              onClick={() => setShow(true)} className="w-[2rem] h-[2rem] overflow-hidden relative rounded-full flex justify-center items-center">
              <Image src={imgs.cam2} alt="partner" priority fill />
            </div>
          </div>
        </>
      ) : (
        <>
          <h1 className="font-bold text-2xl text-center max-w-[75%] w-full mx-auto">
            Verified Afruna Provider
          </h1>
          <div className="flex w-full text-gray-600 text-sm max-w-[75%] xl:max-w-[27%] mx-auto">
            <span className="text-lg font-semibold max-w-[30%] flex justify-start max w-full">
              Name
            </span>
            <span className="text-lg font-semibold flex justify-start w-full">
              Jamal Hayama
            </span>
          </div>
          <div className="flex text-sm text-gray-600 w-full max-w-[75%] xl:max-w-[27%] mx-auto">
            <span className="text-lg font-semibold max-w-[30%] flex justify-start w-full">
              Service
            </span>
            <span className="text-lg font-semibold flex justify-start w-full">
              Cleaning
            </span>
          </div>
          <div className="flex w-full"></div>
          <div className="w-[15rem] h-[18rem] overflow-hidden relative flex justify-center items-center">
            <Image src={imgs.photo} alt="partner" priority fill />
          </div>
        </>
      )}
    </main>
  );
};

export default ScannarPage;
