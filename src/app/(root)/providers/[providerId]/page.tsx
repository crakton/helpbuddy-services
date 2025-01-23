"use client";
import GallerySlider from "@/components/GallerySlider";
import { ProviderCard } from "@/components/ProviderCard";
import ProviderReviewsSlider from "@/components/ProviderReviewsSlider";
import { Button } from "@/components/ui/button";
import { providers, services } from "@/constants/data";
import { imgs } from "@/constants/images";
import { useGetProvidersQuery } from "@/lib/redux/features/apis/providers_api";
import { useGetServicesByProviderIdQuery } from "@/lib/redux/features/apis/services_api";
import { useGetUserQuery } from "@/lib/redux/features/apis/user_api";
import Image from "next/image";
import Link from "next/link";
import { FC, useMemo, useState } from "react";
import getSymbolFromCurrency from "currency-symbol-map";
import {
  BsFillChatLeftTextFill,
  BsHeartFill,
  BsShareFill,
  BsStarFill,
} from "react-icons/bs";
import { HiLocationMarker } from "react-icons/hi";
import { IoMdCheckmark } from "react-icons/io";
import { MdArrowForwardIos } from "react-icons/md";
import { useGetReviewsByServiceIdQuery } from "@/lib/redux/features/apis/reviews_api";
import NoServicesFound from "@/components/ui/NoServicesFound";
import NoThingFound from "@/components/ui/NothingFound";
import { useRouter } from "next/navigation";

interface pageProps {
  params: {
    providerId: string;
  };
}


const Page: FC<pageProps>  = ({params:{providerId}}) => {

  const providersData = useGetProvidersQuery();
  const { data } = useGetServicesByProviderIdQuery(providerId);
  const [serviceIndex, setServiceIndex] = useState(0);
  const service = data?.data[serviceIndex];
  const user = useGetUserQuery(providerId).data?.data;
  const serviceReviews = useGetReviewsByServiceIdQuery(service?._id as string);

  const otherServices = useMemo(() => {
    return data?.data.filter((datum) => datum._id !== service?._id);
  }, [data, service?._id]);
  

  const providers = useMemo(() => {
    if (providersData.isSuccess) {
      return providersData.data.filter((providers) => providers._id !== providerId);
    }
  }, [providerId, providersData.data, providersData.isSuccess]);

  const reviews = serviceReviews.data?.data;
  const {push} = useRouter();
  return (
    <main className="">
      <section className="flex px-4 py-4 gap-2 lg:px-32 justify-start items-center">
        <span className="text-lg font-semibold">Home</span>
        <MdArrowForwardIos className="text-[#999999] text-xs" />
        <span className="text-xs md:text-sm capitalize">
          {service?.category.name} Service
        </span>
        <MdArrowForwardIos className="text-[#999999] text-xs" />
        <span className="text-xs md:text-sm">{service?.name} service</span>
      </section>

      <div className="flex flex-col md:flex-row gap-6 px-6 md:px-8 lg:px-24 xl:px-32">
        <div className="flex flex-col w-full md:max-w-[50%] xl:pr-8 xl:max-w-[60%]">
          <section className=" py-4 gap-2 xl:pr-20">
            <div className="flex justify-start items-center gap-5">
              <div className="flex justify-center items-center">
                <div className="w-[7.5rem] h-[7.5rem] overflow-hidden relative">
                  <Image
                    src={user?.avatar ?? imgs.prodeatimg}
                    alt="detail-img"
                    priority
                    fill
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1 text-afruna-blue">
                <div className="flex justify-start items-center gap-2">
                  <span className="capitalize">
                    {user?.firstName} {user?.lastName}
                  </span>
                  <span
                    className={`${
                      !service?.verified
                        ? "text-orange-700 bg-orange-300"
                        : "text-green-700 bg-green-300"
                    }  rounded-full text-xs  w-[1rem] h-[1rem]  flex justify-center items-center
                  `}
                  >
                    {service?.photos.length ? (
                      <IoMdCheckmark size={11} />
                    ) : null}
                  </span>
                </div>
                <h2 className=" font-semibold">{service?.name} Service</h2>
                <div className="flex flex-col sm:flex-row gap-1  text-xs text-afruna-gray font-semibold">
                  <div className="flex capitalize justify-start text-start items-center text-sm gap-1 lg:gap-1">
                    <HiLocationMarker className="text-[#0382BD] text-xl lg:text-lg" />
                    {service?.state}
                  </div>
                  <div className="flex items-center gap-2 md:ml-4 font-medium">
                    <span className="flex items-center gap-1 lg:gap-1  ">
                      <BsStarFill className="text-afruna-gold" />(
                      {service?.ratedBy})
                    </span>
                    <span className="">({service?.ratings}) Reviews</span>
                  </div>
                </div>
                <span className="text-xs ">Deliverd (0)</span>
              </div>
            </div>
            <div className="flex flex-col gap-3 mt-2 justify-start items-start">
              <p className="text-sm">{service?.desc}</p>
              <Button disabled={service?.providerId._id === null && true} onClick={()=> {
                push("/chat/"+service?.providerId._id)
              }} variant={"afrunaOutline"} className="">
                <BsFillChatLeftTextFill className="text-[1rem] mr-2 sm:text-[1.1rem]" />
                Contact me
              </Button>
            </div>
          </section>

        {/* === services section */}
        {/* if there is a services display it relation */}
        {service !== undefined? (<>
          {service && service.photos.length > 0 ? <GallerySlider photos={service.photos} /> : null}
          <section className="flex mt-12 flex-col py-4 gap-4 justify-start">
            <h2 className="text-2xl font-semibold text-start flex justify-self-start">
              Service Details
            </h2>
            <span className="text-[0.7rem] p-2 bg-orange-100 w-fit">
              PLEASE MESSAGE ME FIRST BEFORE PLACING AN ORDER
            </span>
            <p className="text-sm">
            {}
            </p>
            <div className="flex flex-col gap-1">
              <h3 className="text-sm font-semibold">How does it work?</h3>
              <ul className="pl-5">
                <li className="text-[0.77rem] list-disc">
                  Please message me first before ordering! as this service
                  require me come over for evaluation
                </li>
              </ul>
              <ul className="pl-5">
                <li className="text-[0.77rem] list-disc">
                  Evaluation fee of {getSymbolFromCurrency("NGN")}1000
                </li>
              </ul>
              <ul className="pl-5">
                <li className="text-[0.77rem] list-disc">
                  After evalution and are satisfied you can then proceed to pay
                </li>
              </ul>
              <ul className="pl-5">
                <li className="text-[0.77rem] list-disc">
                  Revision if Needed.
                </li>
              </ul>
              <ul className="pl-5">
                <li className="text-[0.77rem] list-disc">Done.</li>
              </ul>
            </div>
          </section>

          <section className="flex flex-col py-4 gap-4  justify-start">
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 justify-start rounded-md bg-white px-4 py-6">
              <div className="flex flex-col gap-4 lg:w-full lg:max-w-[75%]">
                <div className="flex justify-between max-w-[12rem] items-center">
                  <h4 className="text-sm font-semibold">Evalution Fee</h4>
                  <span className="text-sm">{getSymbolFromCurrency("NGN")}1000</span>
                </div>
                <p className="text-xs">
                  This is a money paid for service provider to come over to an
                  location to evaluate the work before giving qoute if need be
                </p>
              </div>
              <div className="flex justify-start lg:w-full lg:max-w-[25%]">
                {/* <Button
                  variant={"primary"}
                  className="max-w-[10rem] w-full lg:text-sm"
                >
                  Pay Fee
                </Button> */}
              </div>
            </div>
          </section>

          {otherServices && otherServices.length > 0 ? (
            <section className="flex flex-col py-4 gap-4  justify-start">
              <div className="text-2xl font-semibold">
                Service Listing & Pricing
              </div>

              <div className="flex flex-col my-3 gap-4 justify-start sm:justify-between rounded-md bg-white px-4 py-6">
                {otherServices.map((otherService, idx) => {
                  return (
                    <div
                      key={otherService._id}
                      className="flex flex-col sm:flex-row gap-4 justify-start sm:justify-between rounded-md px-4 py-6"
                    >
                      <div className="flex flex-col gap-3">
                        <div className="flex justify-between items-center">
                          <h4 className="text-sm font-semibold">
                            {otherService.desc}
                          </h4>
                        </div>
                        <p className="text-sm">{getSymbolFromCurrency("NGN")?.concat(otherService.price.toLocaleString())}</p>
                      </div>
                      <div className="flex justify-start">
                        <Button
                          onClick={() => setServiceIndex(idx)}
                          variant={"primary"}
                          className="max-w-[90%] lg:max-w-[95%] mx-auto w-full lg:text-xs"
                        >
                          Select Service
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          ) : <NoThingFound message="There are no other services from this provider yet." />}
          <ProviderReviewsSlider reviews={reviews} />
        </>):<NoThingFound message="No published services" />}
        </div>
        <div className="flex w-full flex-col gap-6 md:max-w-[50%] xl:max-w-[40%]">
          <div className="flex gap-3 justify-start items-center">
            <Button variant={"whiteAfrunaButton"} className="text-xs ">
              {" "}
              <BsHeartFill className="mr-1 text-[#A7B7DD]" />
              Favourite
            </Button>
            <Button variant={"whiteAfrunaButton"} className="text-xs">
              {" "}
              <BsShareFill className="mr-1" />
              Share
            </Button>
            <Button variant={"whiteAfrunaButton"} className="text-xs">
              Report
            </Button>
          </div>
          <div className="flex py-10 px-8 bg-white xl:max-w-[90%] w-full flex-col gap-1 rounded-lg">
            <h3 className="text-2xl font-semibold">Service Availability</h3>{" "}
            {service &&
              service?.availability?.days.map((avail, idx) => {
                return (
                  <div
                    key={idx}
                    className="flex justify-between mt-6 font-semibold"
                  >
                    <span className="text-xs">{avail}</span>
                    <p className="flex text-afruna-gray text-xs">
                      {service?.availability.hours.from ?? "8:00 AM"}{" "}
                      {service?.availability.hours.to ?? " to 5:00 PM"}
                    </p>
                  </div>
                );
              })}
            <div className="flex justify-center mt-10 ">
            {service?._id && (  <Link 
                href={`/booking/${service?._id}`}
                className="max-w-[15rem] text-center p-2 bg-gradient-action-provider hover:bg-gradient-action-btn text-xs md:text-sm text-white rounded-md w-full"
              >
                Book Service
              </Link>)}
            {service === undefined && (  <button 
                disabled
                className="max-w-[15rem] cursor-not-allowed text-center p-2 bg-gradient-action-provider hover:bg-gradient-action-btn text-xs md:text-sm text-white rounded-md w-full"
              >
                Book Service
              </button>)}
            </div>
          </div>
        </div>
      </div>

    {/* list other providers */}
    {providers !== undefined?(  <section className="flex flex-col gap-2 px-4 lg:px-32 pt-12 w-full pb-16">
        <div className="flex flex-col gap-2">
          <h3 className=" text-orange-400 text">SERVICES</h3>
          <h1 className="flex text-3xl font-extrabold text-afruna-blue">
            Similar Providers
          </h1>
        </div>
        <div className="flex flex-wrap justify-start gap-6 mt-8 lg:mt-10">
          {providers?.slice(0, 7).map((item) => {
            return <ProviderCard key={item._id} item={item} />;
          })}
        </div>
      </section>):null}
    </main>
  );
};

export default Page;
