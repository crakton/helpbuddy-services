"use client";

import { imgs } from "@/constants/images";
import Image from "next/image";
import { FC, ReactNode, useCallback, useMemo, useRef, useState } from "react";
import { ExtFile, FileInputButton } from "@files-ui/react";
import {
  CountryIso2,
  FlagEmoji,
  defaultCountries,
  parseCountry,
  usePhoneInput,
} from "react-international-phone";
import ReactFlagsSelect from "react-flags-select";
import "react-international-phone/style.css";
import { FaPen } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/hooks";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { IUser } from "@/interfaces";
import * as Select from "@radix-ui/react-select";
import { verifyImageUrl } from "@/utils/verify_image_url";
import { useAuth } from "@/context/UserContext";
import { handleImageUpload } from "@/lib/services/userServices";
import FileUploadDiv from "@/components/ui/FileUpload";

interface pageProps {}
const ENDPOINT = "/api/users/me";
const ProfilePage: FC<pageProps> = ({}) => {

  const {user,logout}  = useAuth()
  // const { user } = useAppSelector((state) => state.profile);
  const dispatch = useAppDispatch();
  const dialerCode = useMemo(() => {
    const code = user?.phoneNumber?.split("-")[0];
    var iso = "ng";
    defaultCountries.filter((c) => {
      const { dialCode, iso2 } = parseCountry(c);
      iso = dialCode == code ? iso2 : "ng";
      return iso;
    });

    return iso;
  }, [user?.phoneNumber]);
  const [_country, _setCountry] = useState<{ Code: string; Name: string }>({
    Code: dialerCode,
    Name: user?.country as string,
  });


  const [isUploading, setIsUploading] = useState(false); // State to track upload progress

  const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event)
    const files = event.target.files;
    
    // Ensure files are present
    if (!files || files.length === 0) {
      toast.warn("No file selected.");
      return;
    }
  
    const file = files[0]; // Get the first selected file
  
    setIsUploading(true); // Set uploading state
  
    try {
      // Call the function to handle image upload
      await handleImageUpload([file], user?.id); 
  
      toast.info("Avatar uploaded successfully!");
    } catch (error) {
      toast.warn("Avatar uploading failed");
      console.error("Error during avatar upload:", error);
    } finally {
      setIsUploading(false); // Reset uploading state
    }
  };
  
  console.log(user)
  

  const { phone, country, setCountry, handlePhoneValueChange, inputRef } =
    usePhoneInput({
      charAfterDialCode: "-",
      prefix: "+",
      defaultCountry: "ng",
      value: user?.phoneNumber,
    });



  const handleSubmitContact = useCallback(async () => {
    type TPayload = {
      country?: string;
      phoneNumber?: string;
    };
    const prePayload = Object.assign<TPayload, TPayload>(
      {},
      {
        country: _country.Name,
        phoneNumber: phone,
      }
    );

    // Filter out properties with falsy values
    const payload = Object.fromEntries(
      Object.entries(prePayload).filter(([key, value]) => {
        if (key === "phoneNumber") {
          const newValue = value?.split("-")[1];
          return Boolean(newValue);
        }
        return Boolean(value);
      })
    );

    try {
      const response = await axios.put<{ data: IUser }>(ENDPOINT, payload, {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
      });
      toast.info("Update succesful");
      dispatch(setProfile(response.data.data));
    } catch (error) {
      toast.warn("Something went wrong");
    }
  }, [_country.Name, dispatch, phone]);
  return (
    <section className="flex flex-col gap-6 max-w-[94%] md:max-w-[100%] mx-auto">
      <h1 className="text-xl lg:text-2xl leading-3 text-afruna-blue font-bold">
        My Profile
      </h1>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-8 w-full bg-white p-6 md:max-w-[75%] rounded-xl drop-shadow">
          <div className="flex lg:pl-6 lg:pt-4 gap-2 sm:gap-3 justify-start items-end">
            <div className="w-[4.5rem] h-[4.5rem] sm:w-[5rem] sm:h-[5rem] lg:w-[7.5rem] lg:h-[7.5rem] shadow rounded-full overflow-hidden relative flex justify-center items-center">
            <Image
  src={
    user?.profilePicture
      ? `${user?.profilePicture}?project=679a0ccf003d8130276a&mode=admin`
      : "/default-avatar.png" // Make sure this exists in your public folder
  }
  alt="Your image"
  fill
/>

            </div>
            <div className="flex flex-col justify-end items-start gap-1">
              <h4 className="capitalize font-semibold text-[0.9rem] lg:text-lg text-start p-2 leading-3">
                {user?.name}
              </h4>
              <FileUploadDiv
  onChange={onFileChange} // onFileChange function to handle file selection
  isUploading={isUploading} // Boolean indicating the uploading state
/>


            </div>
          </div>
          <div className="w-full h-[1px] lg:flex border border-[#D1D1D1]" />
          <form className="w-full max-w-[93%] mx-auto lg:gap-y-8 pb-10 lg:pb-12 flex gap-2 lg:gap-5 flex-col">
            <div className="flex gap-2 lg:gap-x-8 flex-col w-full lg:flex-row">
              <fieldset className="w-full">
                <label
                  htmlFor={"firstName"}
                  className="text-sm font-semibold text-[#232F3E] leading-6"
                >
                  {`First Name`}
                </label>
                <div
                  className={`flex mt-1 justify-between items-center border-[2px] focus-within:border-[2px] focus-within:border-[#FFDBB6] focus-within:shadow-md w-full text-sm
                          font-semibold text-gray-500 rounded-md placeholder:text-gray-400 focus-visible:shadow-md 
                          transition duration-300 sm:text-sm sm:leading-6 
                          `}
                >
                  <input
                    disabled={true}
                    id={"firstName"}
                    type={"text"}
                    value={user?.name}
                    autoComplete={"firstName"}
                    onChange={() => {}}
                    className="w-full capitalize bg-transparent px-2 py-[0.4rem] sm:py-2"
                  />
                </div>
              </fieldset>
              <fieldset className="w-full">
                <label
                  htmlFor={"lastName"}
                  className="text-sm font-semibold text-[#232F3E] leading-6"
                >
                  {`Email`}
                </label>
                <div
                  className={`flex mt-1 justify-between items-center border-[2px] focus-within:border-[2px] focus-within:border-[#FFDBB6] focus-within:shadow-md w-full text-sm
                          font-semibold text-gray-500 rounded-md placeholder:text-gray-400 focus-visible:shadow-md 
                          transition duration-300 sm:text-sm sm:leading-6 
                          `}
                >
                  <input
                    disabled={true}
                    id={"lastName"}
                    type={"text"}
                    value={user?.email}
                    autoComplete={"lastName"}
                    onChange={() => {}}
                    className="w-full capitalize bg-transparent px-2 py-[0.4rem] sm:py-2"
                  />
                </div>
              </fieldset>
            </div>
            {/* <fieldset className="w-full lg:max-w-[47.4%]">
              <label
                htmlFor={"email"}
                className="text-sm font-semibold text-[#232F3E] leading-6"
              >
                {`Email address`}
              </label>
              <div
                className={`flex mt-1 justify-between items-center border-[2px] focus-within:border-[2px] focus-within:border-[#FFDBB6] focus-within:shadow-md w-full text-sm
                          font-semibold text-gray-500 rounded-md placeholder:text-gray-400 focus-visible:shadow-md 
                          transition duration-300 sm:text-sm sm:leading-6 
                          `}
              >
                <input
                  disabled={true}
                  id={"email"}
                  type={"email"}
                  autoComplete={"email"}
                  value={user?.email}
                  className="w-full bg-transparent px-2 py-[0.4rem] sm:py-2"
                />
              </div>
            </fieldset> */}
            {/* <div className="flex mt-4 mb-6 sm:mb-8 lg:mb-10 justify-center lg:justify-end lg:mt-8 items-center">
                      <Button className="border rounded-md border-[#FF9E3A] hover:scale-90 duration-500 transition-all">
                        Update Information
                      </Button>
                    </div> */}
          </form>
        </div>
        <div className="flex flex-col gap-8 w-full bg-white p-6 md:max-w-[75%] rounded-xl drop-shadow">
          <div className="flex lg:pl-6 lg:pt-4 justify-start items-end text-2xl font-bold text-afruna-blue">
            Contact Information
          </div>
          <div className="w-full h-[1px] lg:flex border border-[#D1D1D1]" />

          <form className="w-full max-w-[93%] mx-auto lg:gap-y-8 pb-10 lg:pb-12 flex gap-2 lg:gap-5 flex-col">
            <div className="flex gap-2 flex-col lg:gap-x-8 w-full lg:flex-row">
              <fieldset className="w-full">
                <label
                  htmlFor={"phoneNumber"}
                  className="text-sm font-semibold text-[#232F3E] leading-6"
                >
                  Phone Number
                </label>
                <div
                  className={`mt-1 flex justify-start items-center gap-2 p-3 border rounded-md`}
                >
                  <Select.Root onValueChange={setCountry}>
                    <Select.Trigger>
                      <FlagEmoji iso2={country} />
                    </Select.Trigger>
                    <Select.Content
                      position="popper"
                      className="w-50 h-[40vh] overflow-y-auto bg-slate-50/95 rounded-md p-3"
                    >
                      <Select.Group>
                        <Select.Label>Countries</Select.Label>
                        {defaultCountries.map((c, idx) => {
                          const iso = parseCountry(c);
                          return (
                            <Select.Item
                              className="flex gap-1"
                              key={iso.iso2}
                              value={iso.iso2}
                            >
                              <FlagEmoji iso2={iso.iso2} />
                              <span>{iso.name}</span>
                            </Select.Item>
                          );
                        })}
                      </Select.Group>
                    </Select.Content>
                  </Select.Root>
                  <input
                    id={"phoneNumber"}
                    ref={inputRef}
                    value={phone}
                    onChange={handlePhoneValueChange}
                    placeholder={user?.prefs?.phoneNumber}
                  />
                </div>
              </fieldset>

              <fieldset className="w-full">
                <label
                  htmlFor={"country"}
                  className="text-sm font-semibold text-[#232F3E] leading-6"
                >
                  Country of Resident
                </label>
                <ReactFlagsSelect
                  placeholder={user?.country}
                  
                  id="country"
                  searchable
                  onSelect={(iso) => {
                    defaultCountries.filter((c) => {
                      const { iso2, name } = parseCountry(c);
                      const matched = iso2 === iso.toLowerCase();
                      if (matched) {
                        console.log(name);

                        _setCountry({ Code: iso2, Name: name });
                      }
                    });
                  }}
                  selected={_country.Name}
                  selectButtonClassName="py-3"
                  className="myCustomFlagsSelect capitalize mb-0 mt-1 "
                />
                {/* {country.Name === "" && (
                          <span
                            ref={countryRef}
                            className="text-rose-500 block text-xs bg-white rounded-sm w-fit pl-1"
                          ></span>
                        )} */}
              </fieldset>
            </div>

            {user && user.addresses?.length ? (
              <fieldset className="w-full lg:max-w-[48%]">
                <label
                  htmlFor={"address1"}
                  className="text-sm font-semibold text-[#232F3E] leading-6"
                >
                  {"Address"}
                </label>
                <div
                  className={`flex flex-col mt-1 justify-between items-center border-[2px] focus-within:border-[2px] focus-within:border-[#FFDBB6] focus-within:shadow-md w-full text-sm
                  font-semibold text-gray-600 rounded-md placeholder:text-gray-400 focus-visible:shadow-md 
                  transition duration-300 sm:text-sm sm:leading-6 
                  `}
                >
                  {user?.addresses.map((address) => (
                    <input
                      key={address.concat(
                        Math.floor(Math.random() * 200).toLocaleString()
                      )}
                      id={"address"}
                      value={address}
                      type={"text"}
                      placeholder={" Enter your address"}
                      autoComplete={"address"}
                      disabled
                      className="w-full bg-transparent px-2 py-2"
                    />
                  ))}
                </div>
              </fieldset>
            ) : null}

            <div className="flex mt-4 mb-6 sm:mb-8 lg:mb-10 justify-center lg:justify-end lg:mt-8 items-center">
              <button
                type="button"
                onClick={handleSubmitContact}
                className={`hover:scale-95 border py-2 bg-white rounded-md border-[#FF9E3A] duration-500 transition-all max-w-[11.3rem] w-full`}
              >
                Update Contact
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
