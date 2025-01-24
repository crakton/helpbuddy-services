"use client";

import { FC, memo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { MdHelp, MdSupportAgent } from "react-icons/md";
import { useRouter } from "next/navigation";
import { imgs } from "@/constants/images";
import { ItemPicker } from "@/lib/utils/ItemPicker";

interface AuthHeaderProps {}

const AuthHeader: FC<AuthHeaderProps> = ({}) => {
  const router = useRouter();
  const handleHelpSelection = useCallback(
    (value: string) => {
      switch (value) {
        case "FAQs":
          router.push("faq");
          break;

        default:
          router.push("contact");
          break;
      }
    },
    [router]
  );

  const HELP = ["FAQs", "Contact Us"];

  return (
    <header className="sticky flex items-center justify-between p-2 top-0 bg-gradient-to-r from-[#2a2c79] to-primaryGreen z-30">
      <Link href={"/"} className="flex items-center gap-5 ">
        <Image
          src={imgs.logo}
          alt="logo"
          priority
      
        height={50}
        width={50}
        />
        <p className="font-bold text-lg text-white font-sans">
          Help Buddy
        </p>
      </Link>

      <ItemPicker
        leftTriggerIcon={<MdHelp className="text-xl hidden md:block " />}
        contentClassName={
          "bg-white p-4 text-afruna-blue w-40 text-xs z-40 rounded-md"
        }
        triggerClassName={
          "flex gap-1 md:font-bold items-center text-afruna-blue"
        }
        getSelected={handleHelpSelection}
        items={HELP}
        placeholder="Help!"
      />
    </header>
  );
};

export default memo(AuthHeader);
