"use client"
import React from 'react'
import { imgs } from "@/constants/images";
import Image from "next/image";
function NoServicesFound() {
  return (
    <main className="flex flex-col items-center justify-center">
      <Image src={imgs.bannerCoil} alt="No Services Found" />
      <p>Sorry No Services Found</p>

      </main>
  )
}

export default NoServicesFound
