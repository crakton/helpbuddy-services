import { TResponseError } from "./errors";

export type { TResponseError };

export type LoginParams = {
  email: string;
  password: string;
};

export type RegisterParams = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    countryOfResidence: string;
    password: string;
    role: string;
  };


export interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  countryOfResidence?: string;
  role?: string;
  profilePicture?: string;
}