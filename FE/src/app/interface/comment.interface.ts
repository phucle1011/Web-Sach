export interface IComment {
  commentId: number;
  content: string;
  createdAt: string;
  User: {
    name: string;
  };
  Product: {
    title: string;
  };
}

  