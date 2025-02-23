import { TResponseError } from "./errors";

export type { TResponseError };

export type LoginParams = {
  email: string;
  password: string;
};

export type RegisterParams = {
  fullName: string;
  address: string;
  email: string;
  phone: string;
  country: string;
  password: string;
  role: string;
};

export interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  country?: string;
  role?: string;
  profilePicture?: string;
  avatar?: string;
}

export interface Category {
  name: string;
  description:string;
  isActive: boolean;
  parentId: null | string;
  createdAt: Date;
}

export interface Services {
  $createdAt: "2025-02-14T22:30:57.359+00:00";
  $id: string;
  availability: [];
  category:Category;
  categoryId: string;
  createdAt: Date;
  description: string;
  duration: string;
  images: [];
  isActive: boolean;
  isBlocked: boolean;
  isRemoteService: boolean;
  isVerified: boolean;
  location: string | [];
  maxParticipants: number;
  name: string;
  price: number;
  status: string;
  subCategoryId: string;
  tags: [];
  totalPages: number;
}
