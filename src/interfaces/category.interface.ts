export interface ICategory {
  _id: string;
  name: string;
  children: [];
  options: [];
  parent: string|null;
  icon:string;
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
