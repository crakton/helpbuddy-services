export interface ICategory {
  name: string;
  sub_categories: [];
  options: [];
}

export interface ICategoryResponse {
  success: boolean;
  message: string;
  data: ICategory;
}
export interface ICategoriesResponse {
  success: boolean;
  message: string;
  data: ICategory[];
  limit: number;
  totalDocs: number;
  page: number;
  totalPages: number;
}
