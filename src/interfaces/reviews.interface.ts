export interface IReview {
  _id: string;
  serviceId: {
    _id: string;
    name: string;
    providerId: {
      _id: string;
      firstName: string;
      lastName: string;
      avatar: string;
    };
  };
  userId: {
    _id: string;
    avatar:string;
    firstName:string;
    lastName:string;
  };
  comment: string;
  createdAt: string;
  rating: number;
  updatedAt: string;
}
export interface IReviewResponse {
  success: boolean;
  message: string;
  data: IReview;
}
export interface IReviewsResponse {
  success: boolean;
  message: string;
  data: IReview[];
}
