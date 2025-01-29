"use client";

import Link from "next/link";
import { FC,useState,useCallback } from "react";
import { Button } from "@/components/ui/button";
import { TbLogout } from "react-icons/tb";
import { RiProfileFill } from "react-icons/ri";
import { useRoute } from "@/hooks/useRoute";

interface AccountSideBarProps {}

const AccountSideBar: FC<AccountSideBarProps> = ({}) => {
  const accountRoutes = useRoute()
  
  const [show, setShow] = useState<boolean>(false);
  const toggleAccount = useCallback(() => setShow((prev) => !prev), []);

  return (
    <>
    <aside className="w-full bg-white m-3 rounded-lg max-w-[10rem] z-50 px-1 pt-3 hidden md:flex flex-col gap-6">
      {accountRoutes.map(({ active, href, title, icon:Icon }) => {
        return (
          <Link
            key={title}
            className={`${
              active
                ? "text-slate-950 font-extrabold bg-slate-300 "
                : ""
            } w-full relative group py-2 pl-6 overflow-hidden rounded-md flex justify-between items-center font-medium text-sm text-slate-500/70 hover:text-slate-950 hover:font-extrabold hover:bg-slate-300 transition duration-300`}
            href={href}
          >
            <div className="flex justify-start gap-3 items-center ">
              <Icon className='text-lg'/>
              <span className="xs:hidden md:inline-block text-sm">{title}</span>
            </div>
            <div
              className={`${
                active ? "opacity-100" : ''
              } absolute -right-5 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-orange-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
            />
          </Link>
        );
      })}
      <Button
        className={`w-full relative group rounded-md h-10 pl-6 overflow-hidden gap-2 flex justify-start items-center font-medium text-sm text-slate-500/70 hover:text-slate-950 hover:font-extrabold bg-white hover:bg-slate-300 transition duration-300`}
      >
        {/* <MdLogin className='text-xl'/> */}
        <TbLogout className='text-xl'/>
        Log out
        <div
          className={`absolute -right-5 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-orange-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
        />
      </Button>
    </aside>

    <button
        onClick={toggleAccount}
        className=" md:hidden absolute cursor-pointer top-24 right-5 text-afuna-blue flex justify-between items-center"
      >
        <RiProfileFill className="w-5 h-5 rounded-full" />
      </button>

      <div
        className={`md:hidden absolute z-10 top-40 left-[0.35rem] transition duration-500" flex-col w-fit gap-2  ${
          show
            ? "block translate-x-0 transition duration-500"
            : "block transform -translate-x-[6rem] transition duration-500"
        }`}
      >
        <main className="flex bg-white rounded-xl p-2 flex-col gap-1 w-full ">
          {accountRoutes.map(({active, href, title, icon:Icon }) => (
            <Link
              key={href}
              href={href}
              className={`${
                active ? "bg-[#FFF9F2]" : "bg-white"
              } flex justify-center hover:bg-[#FFF9F2] rounded-md font-medium hover:font-semibold hover:scale-105 transition-all duration-500 text-sm text-[#0C0E3B] p-2 items-center gap-2`}
            >
              <Icon className='text-lg'/>
              <span className="sr-only">{title}</span>
            </Link>
          ))}
          <div className="border-b mt-2 border-slate-300 w-full h-[2px]" />
          <Button
            variant={'primary'}
            // onClick={handleLogOut}
            className="flex mt-2 text-white hover:bg-[#FFF9F2] rounded-md hover:scale-105 transition-all duration-300 text-sm p-1 justify-center items-center gap-2"
          >
            {/* <MdLogout /> */}
            <TbLogout className='text-xl'/>
            <span className="sr-only">Log out</span>
          </Button>
        </main>
      </div>
    </>
    
  );
};

export default AccountSideBar;
