export interface ICategory {
  name: any;
  data: ICategory;
  categoryId: number;
  categoryName: string;
  status: number | string;
}

export interface IPaginatedCategoryResponse {
  data: ICategory[];
  total: number;
  totalPages: number;
  currentPage: number;
}
