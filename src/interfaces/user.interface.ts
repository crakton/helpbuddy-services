export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  country: string;
  email: string;
  password: string;
  role: string;
  verificationToken: string;
  // isVendor: boolean;
  fromOauth: boolean;
  isFollowing: number | null;
  isFollower: number | null;
  addresses: string[];
  followers: string[];
  following: string[];
  createdAt: string;
  updatedAt: string;
  avatar: string;
  blocked?: boolean;
}
export interface IUserResponse {
  success: boolean;
  message: string;
  data: IUser;
}
export interface IUsersResponse {
  success: boolean;
  message: string;
  data: IUser[];
}
