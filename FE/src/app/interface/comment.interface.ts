export interface IComment {
    commentId: number;
    content: string;
    createdAt: string;
    updatedAt: string;
    user: {
      userId: number;
      name: string;
      email: string;
    };
    product: {
      productId: number;
      title: string;
      price: number;
    };
  }
  export interface ICreateComment {
    content: string;
    productId: number;
    userId: number;
  }
  export interface ICommentResponse {
    comments: IComment[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
  }