import { IService } from "./data.interface";

export interface IBooking {
  _id: string;
  serviceId: {
    $id: string;
    name: string;
    category: string;
    subCategory: string;
    location: string;
    desccripttion: string;
    price: number;
    providerId: string;
    availability: {
      days: string[];
      hours: {
        from: string;
        to: string;
      };
    };
    photos: [];
    ratings: number;
    ratedBy: number;
    status: string;
    createdAt: string;
    updatedAt: string;
    customerId: string;
    verified: boolean;
    booked: number;
  };
  customerId: {
    $id: string;
    fullName: string;
    phoneNumber: string;
    country: string;
    email: string;
    role:string;
    addresses: [];
    createdAt: string;
    avatar: string;
    bookings: number;
  };
  providerId: {
    $id: string;
    fullName:string;
    phoneNumber:string;
    location: string;
    country: string;
    email: string;
    role: "provider";
   
  };
  amount: number;
  location: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}
export interface IBookingResponse {
  success: boolean;
  message: string;
  data: IBooking;
}

