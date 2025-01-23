"use client";
import { Fab } from "react-tiny-fab";
import "react-tiny-fab/dist/styles.css";
import EmptyState from "@/app/(accounts)/(routes)/_components/EmptyState";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { UsersList } from "../_components/UsersList";
import { useRouter } from "next/navigation";
import { users } from "@/constants/data";
import { useAppSelector } from "@/hooks";
import Chat from "@/lib/services/chat.service";
import { useGetUsersQuery } from "@/lib/redux/features/apis/user_api";
import { IConvo, IMsg } from "@/interfaces";
import useSearchConvo from "@/hooks/useSearchConvo";
import { MdAdd, MdArrowBack, MdSearch } from "react-icons/md";
import * as Avatar from "@radix-ui/react-avatar";
import { verifyImageUrl } from "@/utils/verify_image_url";
interface pageProps {}

const ChatPage: FC<pageProps> = ({}) => {
  const router = useRouter();
  const handleSelectedChat = useCallback(
    (conversationId: string) => {
      router.push(`/chat/${conversationId}`);
    },
    [router]
  );
  const { convo } = useAppSelector((state) => state.chat);
  const { profile_data } = useAppSelector((state) => state.profile);
  const { data, isSuccess } = useGetUsersQuery();
  useEffect(() => {
    const _ = new Chat();
  }, []);

  const providers = useMemo(() => {
    if (isSuccess) {
      return data.data.filter((user) => user.role === "provider");
    }
    return [];
  }, [data?.data, isSuccess]);

  const { searchResult, setSearchInput } = useSearchConvo({ data: convo });

  return (
    <section className="flex flex-col gap-6 sm:gap-2 max-w-[94%] md:max-w-[100%] mx-auto">
      <h1 className="text-xl lg:pl-0 lg:text-2xl leading-3 text-afruna-blue font-bold">
        Chat
      </h1>
      <div className="flex gap-4 overflow-hidden">
        <div className="flex gap-2 flex-col bg-[#FDFDFF] h-full w-full max-w-[100%] sm:max-w-[30%] xl:max-w-[30%] xl:max-h-[75vh] overflow-hidden border border-[#D5D5E6] rounded-2xl pt-6 xl:pt-6 xl:pl-2">
          <h2 className="ml-4 text-[1.2rem] text-[#0C0E3B] font-medium tracking-normal">
            Messages
          </h2>
          <div className="ml-4 mr-6 bg-white flex items-center border border-afruna-gray/30 rounded-md overflow-hidden">
            <input
              onChange={(e) => setSearchInput(e.target.value)}
              type="text"
              placeholder="Search Name, Id..."
              className="w-full p-2 focus:outline-none placeholder:text-afruna-gray/30"
            />
            <div className="w-14 text-afruna-gray/40">
              <MdSearch className="text-2xl" />
            </div>
          </div>
          {/* <div className="ml-4 mr-6 bg-white flex items-center border border-[#D5D5E6] rounded-md overflow-hidden">
            <input
              type="text"
              placeholder="Search Name, Id..."
              className="w-full p-2 focus:outline-none placeholder:text-[#D2D2D2]"
            />
            <div className="w-14 text-[#D2D2D2]">
              <IoSearchOutline className="text-2xl" />
            </div>
          </div> */}
          <div className="mt-1 relative pt-2">
            <div className="flex relative flex-col gap-2 p-3 h-[45vh] overflow-x-hidden overflow-y-auto">
              {searchResult && searchResult.length > 0
                ? searchResult.map((convo) => (
                    <UsersList
                      selectChat={() => {

                        const idx = convo.recipients.indexOf(
                          profile_data?._id as string
                        );

                        handleSelectedChat(convo.recipients[idx === 0 ? 1 : 0]);
                        // if (profile_data) {
                        //   const foundAt = convo.recipients.indexOf(
                        //     profile_data._id
                        //   ); // get the index of the sender
                        //   const receiver =
                        //     convo.recipients[foundAt > 0 ? 0 : 1];
                        // }
                        // const chatServices = new Chat();
                        // chatServices.getMessage(convo?._id);
                        // const messages =
                        // 	store.store.getState().chat
                        // 		.messages;
                        // setActiveChatHeader(convo);
                        // getMessages(convo._id);
                      }}
                      key={convo?._id}
                      name={convo?.alias ?? ""}
                      number={convo?.unreadMessages}
                      active={false}
                      img={convo?.aliasAvatar}
                      id={convo?._id}
                    />
                  ))
                : null}
            </div>
            <Fab
              //openinig the fab
              onClick={() => {
                document
                  .querySelector("ul.rtf")
                  ?.classList.replace("closed", "open");
              }}
              mainButtonStyles={{
                background: "darkblue",
                bottom: 0,
                top: 100,
                right: 0,
                padding: 20,
                position: "absolute",
              }}
              event="click"
              style={{
                position: "relative",
                bottom: 180,
                width: "content-fit",
                height: "content-fit",
              }}
              icon={<MdAdd />}
            >
              <div
                onClick={() => {
                  document
                    .querySelector("ul.rtf")
                    ?.classList.replace("open", "closed");
                }}
                className="cursor-pointer relative top-0 py-4 bg-gray-300/90 backdrop:blur-lg rounded-lg p-1 w-[40vh] max-h-[40vh] h-fit overflow-y-auto"
              >
                <button className="p-2">
                  <MdArrowBack />
                </button>
                {providers && providers.length > 0 ? (
                  providers
                    .filter((unBlockedUser) => unBlockedUser?.blocked === false)
                    .map(
                      (user) =>
                        user && (
                          <button
                            onClick={() => {
                              document
                                .querySelector("ul.rtf")
                                ?.classList.replace("open", "closed");

                              handleSelectedChat(user._id);
                            }}
                            key={user?._id}
                            className="flex items-center place-items-center gap-2 hover:bg-gray-300/90 w-full rounded-lg"
                          >
                            <Avatar.Root>
                              <Avatar.Image
                                className="object-cover rounded-full text-afruna-blue p-1 w-12 h-12"
                                src={user?.avatar?.startsWith("htttps://")? user?.avatar:''}
                              />
                              <Avatar.Fallback className="text-afruna-blue p-1 w-12 h-12 justify-center rounded-full bg-afruna-blue/20 flex uppercase items-center">
                                {user?.firstName.at(0)}
                                {user?.lastName.at(0)}
                              </Avatar.Fallback>
                            </Avatar.Root>
                            <span>
                              {user?.firstName} {user?.lastName}
                            </span>
                          </button>
                        )
                    )
                ) : (
                  <>empty member!</>
                )}
              </div>
            </Fab>
          </div>
        </div>
        <div className="hidden lg:block h-[73vh] border border-[#D5D5E6] overflow-hidden mr-2 sm:mr-4 xl:mr-16 w-full rounded-2xl">
          <EmptyState />
        </div>
      </div>
    </section>
  );
};

export default ChatPage;
