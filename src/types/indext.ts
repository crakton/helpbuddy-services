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
    phoneNumber: string;
    countryOfResidence: string;
    password: string;
    confirmPassword: string;
    role: string;
  };

