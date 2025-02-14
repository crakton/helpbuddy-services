"use client";
import { imgs } from "@/constants/images";
import Image from "next/image";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm, FieldValues } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { CountryIso2, PhoneInput } from "react-international-phone";
import ReactFlagsSelect from "react-flags-select";
import "react-international-phone/style.css";
import getCountryUtil from "@/lib/utils/get-country.util";
import { Loader2 } from "lucide-react";
import clsx from "clsx";
import { Input } from "@/lib/utils/Input";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import axios, { AxiosError, AxiosResponse } from "axios";

import { useAppDispatch } from "@/hooks";

import ItemPicker from "@/components/ItemPicker";
import Auth from "@/lib/services/authServices";

import authService from "@/lib/services/authServices";
import { LoginParams, RegisterParams } from "@/types/indext";

interface AuthFormProps {}

type Variant = "LOGIN" | "REGISTER";


const AuthForm: FC<AuthFormProps> = ({}) => {
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [agreed, setAgreed] = useState(false);
  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

  // use State
  const [phone, setPhone] = useState("");
  const [currentCountry, setCurrentCountry] = useState<CountryIso2>("ng");
  const [country, setCountry] = useState<{ Code: string; Name: string }>({
    Code: "",
    Name: "",
  }); 

  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  //returns as {Name: "Nigeria", Code: "NG"}
  // const validation = usePhoneValidation(phone);
  // const isPhoneValid = validation.isValid;
  const localeRef = useRef<HTMLSpanElement>(null);
  const phoneValidationRef = useRef<HTMLSpanElement>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const toggleshowPassword = useCallback(
    () => setShowPassword((prev) => !prev),
    []
  );
  const [showConfirmedPassword, setShowConfirmedPassword] =
    useState<boolean>(false);
  const toggleshowConfirmedPassword = useCallback(
    () => setShowConfirmedPassword((prev) => !prev),
    []
  );
  const handleCountrySelection = useCallback((value: string) => {
    let country = getCountryUtil(value);
    setCountry(country);
  }, []);
  const handleGoogleLogin = useCallback(async () => {}, []);
  const {
    formState: { errors, isValid },
    register,
    reset,
    handleSubmit,
  } = useForm<FieldValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phone:phone,
      countryOfResidence:country
      
    
    },
  });

  const router = useRouter();


  const onRegister = async (data:RegisterParams) => {
    const formData = {
      ...data,
      phoneNumber: phone,  // Explicitly add the phone state value
      countryOfResidence: country.Name,  // Extract country name from the selected country object
      role,  // Ensure role is included
    };
  
    console.log(formData);

    setIsLoading(true)
  
    try {
      await authService.register(formData);
      toast.success("Registration successful! Redirecting...");
      
      router.push(role === "Service Provider" ? "/" : "/booking/1");
    
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Registration failed!");
      setIsLoading(false);
    }
  };
  
  const onLogin = async (data:LoginParams) => {
    console.log(data)

   setIsLoading(true);
    try {


      const user = await authService.login(data);

      if (user.role !== role) {
        toast.error(`Access denied. You are registered as a ${user.role}`);
        return;
        setIsLoading(false)
      }

      toast.success("Login successful! Redirecting...");
      router.push(role === "Service Provider" ? "/provider-dashboard" : "/employer-dashboard");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Login failed!");
      setIsLoading(false)
    }
  };


  const ROLES = ["Service Provider", "Employer"];

  const [role,setRole] = useState(ROLES[1])

  const selectRole = (selectedRole: string) => {
    setRole(selectedRole);
    console.log("Selected Role:", selectedRole); // Debugging output
  };
  

  
  const handleAgreed = () => {};

  const handleRememberMe = () => {};

  const [rememberMe, setRemeberMe] = useState(false);

  const login = false;

  return (
    <>
      <h1 className="w-fit mx-auto pt-8 pb-10 lg:pb-6 text-slate-900 text-2xl font-bold">
        {variant === "LOGIN" ? "User Login" : "User Register"}
      </h1>
      <form
        onSubmit={handleSubmit(variant==="REGISTER" ? onRegister : onLogin)}
        
        className={clsx(
          `max-w-[90%] w-full flex flex-col items-center mx-auto rounded-2xl shadow-md p-6 sm:pt-8 md:p-10
         sm:px-6 lg:p-14 bg-white border-[1px] text-xs gap-2`,
          variant === "REGISTER"
            ? "sm:max-w-[28rem] md:max-w-[45rem] lg:max-w-[50rem]"
            : "sm:max-w-[28rem] lg:max-w-[30rem]"
        )}
      >
        <section className="w-full flex flex-col gap-2 lg:gap-4">
          {variant === "REGISTER" ? (
            <aside className="flex flex-col gap-2 md:gap-5 md:flex-row">
              <Input
                label="First Name"
                id="firstName"
                type={"text"}
                placeholder="Jon"
                errors={errors}
                register={register}
                className="px-2.5 py-1.5"
              />
              <Input
                label="Last Name"
                id="lastName"
                type={"text"}
                placeholder="Don"
                errors={errors}
                register={register}
                className="px-2.5 py-1.5"
              />
            </aside>
          ) : null}

          <aside className="flex flex-col gap-2 md:gap-5 md:flex-row">
            <Input
              label="Your Email"
              id="email"
              type={"email"}
              placeholder="don@gmail.com"
              errors={errors}
              register={register}
              className="px-2.5 py-1.5"
            />
            {variant === "REGISTER" ? (
              <fieldset className="flex flex-col w-full">
                <label
                  htmlFor="phone"
                  className="text-sm font-semibold text-[#232F3E] leading-6"
                >
                  Phone Number
                </label>
                {
                  <PhoneInput
                    defaultCountry="ng"
                    inputStyle={{
                      border: "none",
                      width: "100%",
                      padding: "0.5rem",
                    }}
                    onChange={(ph, iso) => {
                      setPhone(ph);
                      setCurrentCountry(iso);
                    }}
                    countrySelectorStyleProps={{
                      buttonStyle: {
                        border: "none",
                        marginLeft: "0.7rem",
                        marginTop: "0.1rem",
                        marginBottom: "0.1rem",
                      },
                    }}
                    charAfterDialCode="-"
                    placeholder="phone number"
                    className="flex mt-1 justify-between items-center border-[2px] focus-within:border-[2px] focus-within:border-[#FFDBB6] focus-within:shadow-md w-full text-sm
                   font-medium rounded-md placeholder:text-gray-400 focus-visible:shadow-md 
                   transition duration-300 sm:text-sm sm:leading-6"
                  />
                }
                {/* {!isPhoneValid && (
                <span
                  ref={phoneValidationRef}
                  className="text-red-500 block bg-white rounded-sm w-fit p-1"
                ></span>
              )} */}
              </fieldset>
            ) : null}
          </aside>
          <aside className="flex flex-col gap-1 md:gap-5 md:flex-row">
            {variant === "REGISTER" ? (
              <fieldset className="w-full">
                <label
                  htmlFor="country"
                  className="text-sm font-semibold text-[#232F3E] leading-6"
                >
                  Country of Residence
                </label>
                <ReactFlagsSelect
                  id="country"
                  searchable
                  onSelect={handleCountrySelection}
                  selected={country.Code}
                  // customLabels={}
                  selectButtonClassName="py-3"
                  className="myCustomFlagsSelect mb-0 mt-1 "
                  // border-[2px] focus-within:border-[2px] focus-within:border-[#FFDBB6] focus-within:shadow-md w-full text-sm
                  // font-medium  rounded-md placeholder:text-gray-400 focus-visible:shadow-md
                  // transition duration-300 sm:text-sm sm:leading-6
                />
                {/* {country.Name === "" && (
                  <span
                    ref={localeRef}
                    className="text-red-500 block bg-red-100 rounded-sm w-fit p-1"
                  ></span>
                )} */}
              </fieldset>
            ) : null}
            <Input
              label={`Password`}
              type={showPassword ? "text" : "password"}
              placeholder={!showPassword ? "*******" : "password"}
              id={`password`}
              register={register}
              errors={errors}
              extraComponent={
                <div onClick={toggleshowPassword}>
                  {!showPassword ? (
                    <FaEye className="mr-2 text-lg" />
                  ) : (
                    <FaEyeSlash className="mr-2 text-lg" />
                  )}
                </div>
              }
            />
          </aside>

          {variant === "REGISTER" ? (
            <div>
              <aside className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between md:w-full">
                <Input
                  label={`Confirm Password`}
                  type={showConfirmedPassword ? "text" : "password"}
                  placeholder={!showConfirmedPassword ? "*******" : "password"}
                  id={`confirmPassword`}
                  register={register}
                  errors={errors}
                  extraComponent={
                    <div onClick={toggleshowConfirmedPassword}>
                      {!showPassword ? (
                        <FaEye className="mr-2 text-lg" />
                      ) : (
                        <FaEyeSlash className="mr-2 text-lg" />
                      )}
                    </div>
                  }
                />
              </aside>

              <ItemPicker
                headerTitle="Select Role"
                contentClassName={
                  "bg-white p-4 text-afruna-blue  text-xs z-40 rounded-md"
                }
                triggerClassName={
                  "flex gap-1 px-2 py-1 md:font-bold items-center text-afruna-blue"
                }
                getSelected={selectRole}
                items={ROLES}
                placeholder="Role"
              />
            </div>
          ) : null}
        </section>

        {variant === "LOGIN" ? (
          <fieldset className="flex justify-between items-center mt-2 w-full">
            <div className="flex justify-between items-center">
              <input
                onChange={handleRememberMe}
                checked={rememberMe}
                className="w-4 bg-black  h-4 focus-within:border-slate-400"
                type="checkbox"
                id="remember"
              />
              <label className="ml-2 text-xs font-semibold" htmlFor="remember">
                Remember me
              </label>
            </div>
            <button type="button" className="text-afruna-gold font-semibold">
              Forgot password?
            </button>
          </fieldset>
        ) : null}

        <section
          className={`w-full text-xs md:text-sm mx-auto 
        ${variant === "REGISTER" ? "md:w-3/5 mt-6" : "md:w-4/5"}`}
        >
          {variant === "REGISTER" ? (
            <fieldset className="flex items-center justify-center w-full mb-2">
              <input
                onChange={handleAgreed}
                className="w-4 h-4 focus-within:border-slate-400"
                type="checkbox"
                id="agreed"
              />
              <label className="ml-2 text-xs font-medium" htmlFor="agreed">
                I agree to the
              </label>
              <span className="underline hover:cursor-pointer capitalize mx-1 font-semibold text-xs hover:text-afruna-gold transition duration-500 hover:underline">
                Terms
              </span>
              <span>&</span>
              <span className="underline hover:cursor-pointer capitalize mx-1 font-semibold text-xs hover:text-afruna-gold transition duration-500 hover:underline">
                Conditions
              </span>
            </fieldset>
          ) : null}
          <Button
            type="submit"
            // !agreed && "cursor-not-allowed"
            variant={"primary"}
            // fullWidth
            // disabled={!agreed && opt.isLoading}
            className={`h-10 font-semibold text-white  rounded-md my-6 w-full gap-2`}
          >
            {isLoading?
              <Loader2 className=" h-6 w-6 text-black animate-spin" />: variant == "REGISTER"?
    <p>Sign Up</p>:""
            }
            {!isLoading && variant=="LOGIN"? <p>Login</p>:""}
            {/* {variant === "REGISTER" ? (
             ""
            ) : (
              <span>Log in</span>
            )} */}
          </Button>

          <div className="relative mb-6">
            <div
              className="
                absolute 
                inset-0 
                flex 
                items-center
              "
            >
              <div className="w-full max-w-[90%] sm:max-w-[75%] lg:max-w-[80%] mx-auto border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                Or continue to
              </span>
            </div>
          </div>

          <button
        onClick={authService.loginWithGoogle} 
            
            type="button"
            className="h-10 hover:scale-95 duration-500 transition-transform text-slate-700 text-xs font-semibold justify-center items-center w-full rounded-md my-1 flex border-[1px] border-slate-300"
          >
            <Image
              src={imgs.google_icon}
              alt="google_icon"
              priority
              className="w-5"
            />
            <span className="ml-2">
              {variant === "REGISTER"
                ? "Sign up with Google"
                : "Log in with Google"}
            </span>
          </button>
          <div className="flex flex-col gap-3 mt-4 md:mt-6 justify-center items-center text-center">
            <p className="text-sm ">
              {variant === "REGISTER"
                ? "Already have an account?"
                : "Don't have an account?"}
            </p>
            <button
              onClick={() => {
                variant === "LOGIN"
                  ? setVariant("REGISTER")
                  : setVariant("LOGIN");
              }}
              type="button"
              className="font-semibold text-sm hover:text-afruna-gold transition duration-500 hover:underline"
            >
              {variant === "LOGIN" ? "Register" : "Login"}
            </button>
          </div>
        </section>
      </form>
    </>
  );
};

export default AuthForm;
