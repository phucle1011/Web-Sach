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
  