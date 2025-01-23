"use client";
import { Fab } from "react-tiny-fab";
import "react-tiny-fab/dist/styles.css";
import { FC, useCallback, useEffect, useState } from "react";
import { UsersList } from "../../_components/UsersList";
import { useRouter } from "next/navigation";
import { IoSearchOutline } from "react-icons/io5";
import { conversations, users } from "@/constants/data";
import EmptyState from "@/app/(accounts)/(routes)/_components/EmptyState";
import { CurrentUserHeader } from "../../_components/CurrentUserHeader";
import { imgs } from "@/constants/images";
import { CurrentUsersConversations } from "../../_components/CurrentUsersConversations";
import { CoversationFooter } from "../../_components/CoversationFooter";
import Chat from "@/lib/services/chat.service";
import { IConvo, IMsg } from "@/interfaces";
import { useAppSelector } from "@/hooks";
import useSearchConvo from "@/hooks/useSearchConvo";
import { MdAdd, MdArrowBack, MdSearch } from "react-icons/md";
import * as Avatar from "@radix-ui/react-avatar";
import { useGetUserQuery } from "@/lib/redux/features/apis/user_api";
interface pageProps {
  params: {
    conversationId: string;
  };
}

const ChatCovoPage: FC<pageProps> = ({ params: { conversationId } }) => {
  const { convo, messages } = useAppSelector((state) => state.chat);
  const { profile_data } = useAppSelector((state) => state.profile);
  const [activeChat, setActiveChat] = useState<IMsg[]>([]);

  const router = useRouter();
  const { data, isSuccess } = useGetUserQuery(conversationId);
  const handleSelectedChat = useCallback(
    (conversationId: string) => {
      router.replace(`/chat/${conversationId}`);
    },
    [router]
  );
  const getMessages = useCallback(async (id:string) => {
    const _ = new Chat();
    
      const messages = await _.getMessage(id);
      setActiveChat(messages as IMsg[]);
    
  }, []);

  const { searchResult, setSearchInput } = useSearchConvo<IConvo>({ data: convo  ,});

  return (
    <section className="flex flex-col gap-6 sm:gap-2 max-w-[94%] md:max-w-[100%] mx-auto">
      <h1 className="text-xl lg:pl-0 lg:text-2xl leading-3 text-afruna-blue font-bold">
        Chat
      </h1>
      <div className="flex gap-4">
        <div className="hidden sm:flex gap-2 flex-col bg-[#FDFDFF] h-full w-full max-w-[100%] sm:max-w-[50%] xl:max-w-[30%] xl:max-h-[75vh] overflow-hidden border border-[#D5D5E6] rounded-2xl pt-6 xl:pt-6 xl:pl-2">
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
                        getMessages(convo._id);
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
                      img={convo?.aliasAvatar??imgs.anonyUser}
                      id={convo?._id}
                    />
                  ))
                : null}
            </div>
            {/* <Fab
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
                                handleSelectedChat("1")
                            }}
                            key={user?._id}
                            className="flex items-center place-items-center gap-2 hover:bg-gray-300/90 w-full rounded-lg"
                          >
                            <Avatar.Root>
                              <Avatar.Image
                                className="object-cover rounded-full text-afruna-blue p-1 w-12 h-12"
                                src={user?.avatar}
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
            </Fab> */}
          </div>
        </div>
        <div className="max-h-[73vh] border border-[#D5D5E6] overflow-hidden mr-2 sm:mr-4 xl:mr-16 w-full rounded-2xl">
          {conversations && conversations.length > 0 ? (
            <div className="flex justify-between flex-col h-full">
              <div className="h-[4.5rem] px-2 sm:px-8 border-b border-[#D5D5E6] flex justify-center items-center">
                <CurrentUserHeader
                  name={`${data?.data.firstName} ${data?.data.lastName}`}
                  img={data?.data.avatar as string}
                  active={true}
                  id={data?.data._id as string}
                />
              </div>
              <div className="ScrollAreaRoot flex-1 w-full max-h-[50vh] h-full text-xl rounded-lg overflow-hidden overflow-y-auto">
                <div className="flex h-full flex-col gap-1 pt-2 px-4">
                  {messages.map((message) => {
                    
                    return (
                      <CurrentUsersConversations
                        key={message._id}
                        img={message.from.avatar}
                        message={message.message}
                        time={message.createdAt}
                        isOwn={profile_data?._id === message.from._id? true:false}
                      />
                    );
                  })}
                </div>
              </div>
              <CoversationFooter to={data?.data._id as string} />
            </div>
          ) : (
            <EmptyState />
          )}
        </div>
      </div>
    </section>
  );
};

export default ChatCovoPage;
