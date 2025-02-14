import { IService } from "./data.interface";

export interface IBooking {
  _id: string;
  serviceId: {
    _id: string;
    name: string;
    category: string;
    subCategory: string;
    state: string;
    country: string;
    desc: string;
    price: number;
    additionalService: IService[];
    providerId: string;
    availability: {
      days: string[];
      hours: {
        from: string;
        to: string;
      };
    };
    photos: [];
    licenseAndCertification: [];
    insuranceCoverage: [];
    publish: boolean;
    ratings: number;
    ratedBy: number;
    status: string;
    createdAt: string;
    updatedAt: string;
    customId: string;
    verified: boolean;
    booked: number;
  };
  customerId: {
    _id: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    country: string;
    email: string;
    // password: "a7ccce6c3f49ae83d8bf0cde580d3369615efe6829f1a46a3694223d7ebd329d0b07c9d28aa596c9b4e99423b7493d86dc4c87b26ac596396f02ca29838e053e.64258785e5d9567e";
    role: "user";
    // verificationToken: "f813a4f45af8d97ebe133a64faa46424e0a5abc7e5fc2d432c980573652afe31c9d86f8931f15d4aa3cba4d15f5c0d06";
    isVendor: boolean;
    addresses: [];
    createdAt: string;
    updatedAt: string;
    following: string[];
    avatar: string;
    bookings: number;
  };
  providerId: {
    _id: string;
    firstName:string;
    lastName: string;
    phoneNumber:string;
    country: string;
    email: string;
    // password: "e7d33a664b4fd41ecb72833e081c395779346bd98a0f3d43d30269bdbea2ff9a13e00df7f88606df86e4f5034f78e43f4e4a7d99ec16ac92247980a5ce0cd033.20d8c2cc7ac9244d";
    role: "provider";
    // verificationToken: "c06621f6fe8d9c0642fa8a0e1854a8b7e660cc46884eacacbc484159df23f2aa8988965775ebb40f218b62a2155a563d";
    isVendor: boolean;
    isProvider: boolean;
    fromOauth: boolean;
    blocked: boolean;
    isFollowing: boolean|null;
    isFollower: boolean|null;
    addresses: [];
    followers: [];
    following: [];
    createdAt: string;
    updatedAt: string;
    online: boolean;
    socketId: string;
    avatar: string;
    booked: number;
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
export interface IBookingsResponse {
  success: boolean;
  message: string;
  data: IBooking[];
}
