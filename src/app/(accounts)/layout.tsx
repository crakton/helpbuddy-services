import { FC, ReactNode } from "react";
import MainHeader from "../(root)/_components/MainHeader";
import Footer from "../(root)/_components/Footer";
import { NewsLetter } from "@/components/NewsLetter";
import AccountSideBar from "./(routes)/_components/AccountSideBar";

interface layoutProps {
  children: ReactNode;
}

const AccountLayout: FC<layoutProps> = ({ children }) => {
  return (
    <div className="h-full">
      <MainHeader />
      <div className=" min-h-full flex bg-[#F7F7FF] gap-10">
        <AccountSideBar />
        <aside className=" pt-7 pb-12 md:pb-16 w-full">{children}</aside>
      </div>
      <NewsLetter />
      <Footer />
    </div>
  );
};

export default AccountLayout;
