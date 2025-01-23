"use client";

import { FC, memo, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import {
  MdHelp,
  MdMenu,
  MdOutlineLogout,
  MdOutlineQrCodeScanner,
  MdSearch,
  MdShoppingCart,
  MdSupportAgent,
} from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { IoIosNotifications, IoMdMenu } from "react-icons/io";
import Link from "next/link";
import Image from "next/image";
// import { ItemPicker } from "@/lib";
import { imgs } from "@/constants/images";
import Heading from "@/app/(root)/_components/heading";
import { FaUser } from "react-icons/fa";
import { BsFillChatLeftTextFill, BsHeartFill } from "react-icons/bs";
import { ItemPicker } from "@/lib/utils/ItemPicker";
import { AiFillAccountBook } from "react-icons/ai";
import { FiChevronDown } from "react-icons/fi";
import AllServicesModel from "@/components/AllServicesModel";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { profile } from "console";
import { verifyImageUrl } from "@/utils/verify_image_url";
import { setProfile } from "@/lib/redux/features/slices/profileSlice";

interface MainHeaderProps {}

const MainHeader: FC<MainHeaderProps> = ({}) => {
  const [sideNavOpen, setSideNavOpen] = useState<boolean>(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(true);
  const [selectedcategory, setselectedCategory] = useState("");

  const router = useRouter();
  const {profile_data} = useAppSelector((state) => state.profile);
;

  const toggleCategoryMenu = useCallback(
    () => setIsCategoryMenuOpen(!isCategoryMenuOpen),
    [isCategoryMenuOpen]
  );

  const [isShow, setIsShow] = useState<boolean>(false);

  const toggleCategoriesMenu = useCallback(
    () => setIsShow((prev) => !prev),
    []
  );

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
  const [show, setShow] = useState<boolean>(true);
  return (
    <header className="sticky top-0 bg-gradient-to-r from-orange-300 to-orange-50 z-30">
      <nav className="max-w-[97%] md:max-w-[95%] w-full flex justify-between items-center mx-auto p-6 lg:max-w-[90%]">
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
            <div className="w-[9rem] sm:w-[10rem] h-[1.5rem] md:w-[12rem] md:h-[2.5rem] lg:w-[14rem] lg:h-[3.7rem] overflow-hidden relative">
              <Image src={imgs.logo} alt="logo" width={300} height={200} />
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
                <Link href={"/chat"}>
                  <BsFillChatLeftTextFill className="text-[0.95rem] sm:text-[1.1rem]" />
                </Link>
                <ItemPicker
                  mobileClassName="hidden md:flex lg:hidden xl:flex text-sm lg:text-base"
                  triggerClassName="flex gap-2 items-center capitalize"
                  contentClassName={
                    "bg-white p-4 text-afruna-blue w-40 text-xs z-30 rounded-md"
                  }
                  getSelected={(val) => console.log(val)}
                  leftTriggerIcon={
                    <div className="w-[1.6rem] h-[1.6rem] md:w-8 md:h-8 lg:w-10 lg:h-10  rounded-full transition-all hover:scale-90 ease-in-out duration-300 overflow-hidden relative flex justify-center items-center">
                      <Image src={verifyImageUrl(profile_data?.avatar as string)} alt="Your image" fill />
                    </div>
                  }
                  placeholder={`${profile_data?.firstName} ${profile_data?.lastName}`}
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
                      onClick={handleLogOut}
                      className="bg-gradient-to-b from-blue-400 to-blue-900 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-800 transition duration-500 my-2 w-full text-white p-2 rounded-md flex items-center justify-center space-x-2"
                    >
                      <MdOutlineLogout className="text-lg" />
                      <span className="text-md">Log out</span>
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
