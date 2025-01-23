"use client"
import React from 'react'
import { imgs } from "@/constants/images";
import Image from "next/image";
function NoThingFound({message = "Sorry Nothing Found"}:{message?:string}) {
  return (
    <main className="flex flex-col items-center justify-center">
      <Image src={imgs.bannerCoil} alt="NoThing Found" />
      <p>{message}</p>
      </main>
  )
}

export default NoThingFound;
