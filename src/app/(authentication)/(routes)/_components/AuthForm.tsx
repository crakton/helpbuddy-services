"use client";
import Cookies from "js-cookie";
import { imgs } from "@/constants/images";
// import { Input } from "@/li";
import Image from "next/image";
import {
  ChangeEventHandler,
  FC,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  SubmitHandler,
  useForm,
  FieldValues,
  FieldValue,
} from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  CountryIso2,
  PhoneInput,
  // usePhoneValidation,
} from "react-international-phone";
import ReactFlagsSelect from "react-flags-select";
import "react-international-phone/style.css";
import getCountryUtil from "@/lib/utils/get-country.util";
// import { Button } from "@/lib/Button";
import { Loader2 } from "lucide-react";
import clsx from "clsx";
import { Input } from "@/lib/utils/Input";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import axios, { AxiosError, AxiosResponse } from "axios";
import { TResponseError } from "@/types/errors";
import { IUser } from "@/interfaces";
import { useAppDispatch } from "@/hooks";
import { setProfile } from "@/lib/redux/features/slices/profileSlice";
import { login } from "@/lib/redux/features/slices/authSlice";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "@/lib/redux/features/apis/auth_api";
import { MdHelp } from "react-icons/md";
import ItemPicker from "@/components/ItemPicker";

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
  const [phone, setPhone] = useState("");
  const [currentCountry, setCurrentCountry] = useState<CountryIso2>("ng");
  const [country, setCountry] = useState<{ Code: string; Name: string }>({
    Code: "",
    Name: "",
  }); //returns as {Name: "Nigeria", Code: "NG"}
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
    },
  });
  const [userLogin, loginResult] = useLoginUserMutation();
  const [userRegister, registerResult] = useRegisterUserMutation();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const ROLES = ["Service Provider", "Employer"];

  const selectRole = () => {
    console.log("hello");
  };
  const onSubmit: SubmitHandler<FieldValues> = useCallback(
    async (data) => {
      if (variant === "REGISTER") {
        const payload = Object.assign({}, { phoneNumber: phone }, data, {
          country: country.Name,
        });
        console.log(payload);

        if (!payload.firstName) {
          toast.warning("First Name required!");
          return;
        } else if (!payload.lastName) {
          toast.warning("Last Name required!");
          return;
        } else if (!payload.email) {
          toast.warning("Email required!");
          return;
        } else if (!payload.password) {
          toast.warning("Password required!");
          return;
        } else if (payload.confirmPassword !== payload.password) {
          toast.warning("Must match with password!");
          return;
        } else if (!payload.country) {
          toast.warning("Country required!");
          return;
        } else if (!payload.phoneNumber) {
          toast.warning("Phune number required!");
          return;
        } else {
          await userRegister(payload);
        }
      }
      if (variant === "LOGIN") {
        const payload = Object.assign(
          {},
          { email: data.email as string, password: data.password as string }
        );
        const isValid = Object.values(payload)
          //ensure all fields are not empty
          .every((value) => {
            if (!value) {
              toast.warning("All fields are required!");
              return false;
            }
            return true;
          });

        if (!isValid) {
          return;
        }
        await userLogin(payload);
      }
    },
    [variant, phone, country.Name, userRegister, userLogin]
  );
  const [rememberMe, setRememberMe] = useState(false);
  const handleRememberMe: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => setRememberMe(event.target.checked),
    []
  );
  const handleAgreed: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => setAgreed(event.target.checked),
    []
  );

  useEffect(() => {
    if (loginResult.isError) {
      const error = loginResult.error as {
        data: TResponseError;
        status: number;
      };
      console.log("error", error);
      toast.error(error.data.message);
      return;
    }
    if (loginResult.isSuccess) {
      const data = loginResult.data;
      const user: IUser = data.data.user;
      if (user.role === "user") {
        Cookies.set("token", data.data.token);
        dispatch(login());
        dispatch(setProfile(user));
        toast.success(data.message);
        reset();
        router.replace("/");
      }
      return;
    }
  }, [
    dispatch,
    loginResult.data,
    loginResult.error,
    loginResult.isError,
    loginResult.isSuccess,
    reset,
    router,
  ]);

  //listens to after registeration
  useEffect(() => {
    if (registerResult.isError) {
      const error = registerResult.error as {
        data: TResponseError;
        status: number;
      };
      console.log("error", error);
      toast.error(error.data.message);
      return;
    }
    if (registerResult.isSuccess) {
      const data = registerResult.data;
      const user: IUser = data.data.user;
      Cookies.set("token", data.data.token);
      dispatch(login());
      dispatch(setProfile(user));
      toast.success(data.message);
      reset();
      setVariant("LOGIN");
      return;
    }
  }, [
    dispatch,
    registerResult.data,
    registerResult.error,
    registerResult.isError,
    registerResult.isSuccess,
    reset,
    router,
  ]);

  return (
    <>
      <h1 className="w-fit mx-auto pt-8 pb-10 lg:pb-6 text-slate-900 text-2xl font-bold">
        {variant === "LOGIN" ? "User Login" : "User Register"}
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
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
            {variant === "REGISTER" && registerResult.isLoading && (
              <Loader2 className=" h-6 w-6 text-black animate-spin" />
            )}
            {variant === "LOGIN" && loginResult.isLoading && (
              <Loader2 className=" h-6 w-6 text-black animate-spin" />
            )}
            {variant === "REGISTER" ? (
              <span>Sign up</span>
            ) : (
              <span>Log in</span>
            )}
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
            onClick={handleGoogleLogin}
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
