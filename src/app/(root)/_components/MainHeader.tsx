"use client";

import { FC, memo, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import {
  MdOutlineLogin,
  MdOutlineLogout,
} from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { IoIosNotifications, IoMdMenu } from "react-icons/io";
import Link from "next/link";
import Image from "next/image";
import { imgs } from "@/constants/images";
import { FaUser } from "react-icons/fa";
import { BsHeartFill } from "react-icons/bs";
import { ItemPicker } from "@/lib/utils/ItemPicker";
import { AiFillAccountBook } from "react-icons/ai";
import { FiChevronDown } from "react-icons/fi";
import AllServicesModel from "@/components/AllServicesModel";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { verifyImageUrl } from "@/utils/verify_image_url";
import { useAuth } from "@/context/UserContext";

interface MainHeaderProps {}

const MainHeader: FC<MainHeaderProps> = ({}) => {
  const [sideNavOpen, setSideNavOpen] = useState<boolean>(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(true);
  const [selectedcategory, setselectedCategory] = useState("");



  const router = useRouter();
  const { user, logout} = useAuth()
  const toggleCategoryMenu = useCallback(
    () => setIsCategoryMenuOpen(!isCategoryMenuOpen),
    [isCategoryMenuOpen]
  );

  const [isShow, setIsShow] = useState<boolean>(false);

  const toggleCategoriesMenu = useCallback(
    () => setIsShow((prev) => !prev),
    []
  );
console.log(user?.profilePicture)
  const handleHelpSelection = useCallback((value: string) => {
    //   switch (value) {
    //     case HELP[0]:
    //       router.push("/faq");
    //       break;
    //     default:
    //       router.push("contact");
    //       break;
    //   }
  }, []);
  const dispatch = useAppDispatch();
  const handleLogOut = useCallback(() => {
    router.replace("/authentication");
  }, [router]);
  const [show, setShow] = useState<boolean>(false);
  return (
    <header className="sticky top-0 bg-gradient-to-r from-[#2a2c79] to-[#399878] z-30">
      <nav className="max-w-[97%] md:max-w-[95%] w-full flex justify-between items-center mx-auto py-3 lg:max-w-[90%]">
        <div className="flex justify-between items-center gap-2 md:gap-0 sm:max-w-[60%] sm:w-full md:w-fit">
          {!sideNavOpen ? (
            <IoMdMenu
              onClick={() => setSideNavOpen(true)}
              className="block md:hidden text-2xl sm:text-3xl cursor-pointer text-afruna-blue"
            />
          ) : (
            <RxCross2
              onClick={() => setSideNavOpen(false)}
              className="block md:hidden text-2xl sm:text-3xl cursor-pointer text-afruna-blue"
            />
          )}
          <Link href={"/"} className="flex justify-center items-center">
            <div className="flex items-center gap-4 text-lg">
              <Image src={imgs.logo} alt="logo" width={50} height={50} />
              <p className="font-bold text-white  font-sans">Help Buddy</p>
            </div>
          </Link>
        </div>

        <div className="flex justify-center items-center gap-10 lg:gap-16">
          <div className="hidden lg:flex justify-center items-center gap-2 lg:gap-4 text-afruna-blue font-semibold">
            <Link
              href={"/"}
              className="hover:scale-95 duration-300 text-xs xl:text-sm"
            >
              Home
            </Link>
            <button
              onClick={() => {
                show ? setShow(false) : setShow(true);
              }}
              className=" flex justify-center items-center gap-1 text-afruna-blue text-xs xl:text-sm"
            >
              Service{" "}
              <FiChevronDown
                className={`${
                  show && "rotate-180"
                } text-xl transition ease-linear duration-300`}
              />
            </button>
            {show ? <AllServicesModel /> : null}
            <Link
              href={"/providers"}
              className="hover:scale-95 duration-300 text-xs xl:text-sm"
            >
              Service Provider
            </Link>
            <Link
              href={"/services"}
              className="hover:scale-95 duration-300 text-xs xl:text-sm"
            >
              Services
            </Link>
            <Link
              href={"/contact"}
              className="hover:scale-95 duration-300 text-xs xl:text-sm"
            >
              Contact Us
            </Link>
          </div>

          <div className="flex justify-center items-center gap-2 lg:gap-3">
            {true ? (
              <>
                {/* <Link href={"/"} className="relative">
                  <IoIosNotifications className="text-[1.4rem] sm:text-[1.6rem]" />
                  <span className="absolute top-0 right-0 text-white bg-rose-400 w-[0.75rem] h-[0.75rem] sm:w-[0.8rem] sm:h-[0.8rem] text-[8px] rounded-full flex justify-center items-center">
                    {" "}
                    3
                  </span>
                </Link> */}
                {/* <Link href={"/chat"}>
                  <BsFillChatLeftTextFill className="text-[0.95rem] sm:text-[1.1rem]" />
                </Link> */}
                <ItemPicker
                  mobileClassName="hidden md:flex lg:hidden xl:flex text-sm lg:text-base"
                  triggerClassName="flex gap-2 items-center capitalize"
                  contentClassName={
                    "bg-white p-4 text-afruna-blue w-40 text-xs z-30 rounded-md"
                  }
                  getSelected={(val) => console.log(val)}
                  leftTriggerIcon={
                    <div className="w-[1.6rem] h-[1.6rem] md:w-8 md:h-8 lg:w-10 lg:h-10  rounded-full transition-all hover:scale-90 ease-in-out duration-300 overflow-hidden relative flex justify-center items-center">
                      <Image
                        src={verifyImageUrl(user?.avatar as string)}
                        alt="Your image"
                        fill
                      />
                    </div>
                  }
                  placeholder={`${
                    user
                      ? `${user.name}`
                      : "user name"
                  }`}
                  profileLinks={[
                    {
                      name: "Profile",
                      href: "/profile",
                      icon: <FaUser />,
                    },
                    {
                      name: "Favorite",
                      icon: <BsHeartFill />,
                      href: "/favorite",
                    },
                    {
                      name: "Bookings",
                      icon: <AiFillAccountBook />,
                      href: "/bookings",
                    },
                    // {
                    //   name: "Scannar",
                    //   href: "/scannar",
                    //   icon: <MdOutlineQrCodeScanner />,
                    // },
                  ]}
                  extraComponent={
                    <button
                      onClick={() => {
                        if (user) {
                          logout();
                        }
                        router.push("/authentication");
                      }}
                      className="bg-gradient-to-b from-blue-400 to-blue-900 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-800 transition duration-500 my-2 w-full text-white p-2 rounded-md flex items-center justify-center space-x-2"
                    >
                      {user ? (
                        <>
                          <MdOutlineLogout className="text-lg" />
                          <span className="text-md">Log out</span>
                        </>
                      ) : (
                        <>
                          <MdOutlineLogin className="text-lg" />
                          <span className="text-md">Join Us</span>
                        </>
                      )}
                     
                    </button>
                  }
                />
              </>
            ) : (
              <div className="hidden md:flex justify-center items-center gap-4">
                <button className="text-xs font-semibold py-1 px-0 sm:px-2 text-afruna-blue hover:scale-95 duration-300 transition-all">
                  Log in
                </button>
                <button className="text-xs font-semibold text-afruna-blue border-2 border-sky-300 hover:scale-95 duration-300 transition-all rounded-md py-[0.3rem] sm:py-2 px-4 sm:px-6">
                  Sign up
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default memo(MainHeader);
