import { ICategory } from ".";

export interface IService {
  _id: string;
  name: string;
  category: string;
  subCategory: string;
  state: string;
  country: string;
  desc: string;
  price: number;
  additionalService: [];
  providerId:string;
  // providerId: {
  //   _id: string;
  //   avatar:string;
  //   firstName: string;
  //   lastName: string;
  // };
  availability: {
    days: string[];
    hours: {
      from: string | null;
      to: string | null;
    };
  };
  photos: string[];
  licenseAndCertification: [];
  insuranceCoverage: [];
  publish: boolean;
  ratings: number;
  ratedBy: number;
  status: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  customId: string;
  verified?:boolean;
}
export interface IServices {
  _id: string;
  name: string;
  category: ICategory;
  subCategory: string;
  state: string;
  country: string;
  desc: string;
  price: number;
  additionalService: [];
  providerId: {
    _id: string;
    avatar:string;
    firstName: string;
    lastName: string;
  };
  availability: {
    days: string[];
    hours: {
      from: string | null;
      to: string | null;
    };
  };
  photos: string[];
  licenseAndCertification: [];
  insuranceCoverage: [];
  publish: boolean;
  ratings: number;
  ratedBy: number;
  status: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  customId: string;
  verified?:boolean;
}

export interface IServiceResponse {
  success: boolean;
  message: string;
  data: IService;
}
export interface IServicesResponse {
  success: boolean;
  message: string;
  data: IServices[];
  limit: number;
  totalDocs: number;
  page: number;
  totalPages: number;
}
