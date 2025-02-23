import { IService } from "./data.interface";

export interface IBooking {
 
    name: string;
    category: string;
    tags:[];
    subCategoryId: string;
    location: string;
    description: string;
    price: number;
    availability:string;
    images: [];
  userId:string
  status: string;
  isRemoteService: boolean;
  isActive: boolean;
  duration: number;
  serviceId:string;

}

export interface IBookingResponse {
  success: boolean;
  message: string;
  data: IBooking;
}

