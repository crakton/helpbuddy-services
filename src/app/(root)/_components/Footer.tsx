'use-client'

import { FC, memo } from 'react'
// import { StoreBtn } from "@/components/widgets/StoreBtn";
import Image from "next/image";
import Link from "next/link";
import {
  FaAppStore,
  FaFacebookF,
  FaGooglePlay,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { TiSocialInstagram, TiSocialYoutube } from "react-icons/ti";
import { StoreBtn } from './StoreBtn';
import { imgs } from '@/constants/images';

interface FooterProps {}

const Footer: FC<FooterProps> = ({}) => {
  return (
    <footer className='flex flex-col'>
      <div className="pt-8 bg-[#FCF5E5] grid grid-cols-9 gap-2 md:gap-4 text-afruna-blue">
        <div className="col-span-full md:col-span-3">
          <div className="flex p-5 md:p-10 flex-col gap-6 justify-center items-center ">
            <Image src={imgs.footerLogo} alt="Afruna Logo" className="md:w-52" />
            <p className="text-xs">App comming soon...</p>
            <div className="flex flex-row justify-between items-center space-x-1">
              <StoreBtn
                iconComponent={<FaAppStore size={27} />}
                title={"App Store"}
                subtitle={"Download on the"}
              />
              <StoreBtn
                iconComponent={<FaGooglePlay size={27} />}
                title={"Google Play"}
                subtitle={"GET IT ON"}
              />
            </div>
          </div>
        </div>
        <div className="col-span-full md:col-span-4 grid grid-cols-4 gap-4 md:gap-8 p-1">
          <div className="text-xs col-span-1">
            <h3 className="font-bold my-1">About</h3>
            <div className="flex flex-col space-y-2">
              <Link href={""}>About us</Link>
              <Link href={""}>Contact us</Link>
              <Link href={""}>Career</Link>
            </div>
          </div>
          <div className="text-xs col-span-1">
            <h3 className="font-bold my-1">Privacy</h3>
            <div className="flex flex-col space-y-2">
              <Link href={""}>About us</Link>
              <Link href={""}>Find store</Link>
              <Link href={""}>Categories</Link>
              <Link href={""}>Blogs</Link>
            </div>
          </div>
          <div className="text-xs col-span-1">
            <h3 className="font-bold my-1">Let us help you</h3>
            <div className="flex flex-col space-y-2">
              <Link href={""}>Help center</Link>
              <Link href={""}>Money Refund</Link>
              <Link href={""}>Shipping</Link>
              <Link href={""}>Partnership</Link>
              <Link href={""}>F&Q</Link>
            </div>
          </div>
          <div className="text-xs col-span-1">
            <h3 className="font-bold my-1">For users</h3>
            <div className="flex flex-col space-y-2">
              <Link href={""}>Login</Link>
              <Link href={""}>Register</Link>
              <Link href={""}>Settings</Link>
              <Link href={""}>Sell on Afruna</Link>
              <Link href={""}>My Orders</Link>
            </div>
          </div>
        </div>
        <div className="col-span-full md:col-span-2 p-2 space-y-2 text-center md:text-start">
          <h4 className="text-xs">Follow us</h4>
          <div className="flex justify-center md:justify-start items-center space-x-2">
            <Link href={""} className="bg-afruna-blue p-2 rounded-full">
              <FaFacebookF size={14} className="text-white" />
            </Link>
            <Link href={""} className="bg-afruna-blue p-2 rounded-full">
              <FaTwitter size={14} className="text-white" />
            </Link>
            <Link href={""} className="bg-afruna-blue p-2 rounded-full">
              <FaLinkedinIn size={14} className="text-white" />
            </Link>
            <Link href={""} className="bg-afruna-blue p-2 rounded-full">
              <TiSocialInstagram size={14} className="text-white" />
            </Link>
            <Link href={""} className="bg-afruna-blue p-2 rounded-full">
              <TiSocialYoutube size={14} className="text-white" />
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full p-3 space-x-2 space-y-2 text-center text-xs text-afruna-blue bg-gradient-to-br from-orange-100 to-gray-200 via-orange-400">
        <span>&copy; {new Date().getFullYear()}</span>
        <span>Afruna Global Company | All Rights Reserved.</span>
      </div>
    </footer>
  )
}

export default memo(Footer);