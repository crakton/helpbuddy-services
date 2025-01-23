import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { useConversation } from "./useConversation";
import { AiFillAccountBook } from "react-icons/ai";
import { BsFillChatLeftTextFill, BsHeartFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { MdOutlineRateReview } from "react-icons/md";

export const useRoute = () => {
  const pathname = usePathname();
  const { conversationId } = useConversation();

  const accountRoutes = useMemo(
    () => [
      {
        title: "Profile",
        icon: FaUser,
        active: pathname === "/profile",
        href: "/profile",
      },
      {
        title: "Bookings",
        icon: AiFillAccountBook,
        active: pathname === "/bookings",
        href: "/bookings",
      },
      {
        title: "Favorite",
        icon: BsHeartFill,
        active: pathname === "/favorite",
        href: "/favorite",
      },
      {
        title: "Review",
        icon: MdOutlineRateReview,
        active: pathname === "/review",
        href: "/review",
      },
      {
        title: "Chat",
        icon: BsFillChatLeftTextFill,
        active: pathname === "/chat" || !!conversationId,
        href: "/chat",
      },
    ],
    [pathname, conversationId]
  );

  return accountRoutes;
};
