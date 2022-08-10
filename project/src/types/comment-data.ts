export interface ICommentData {
  comment: string;
  date: string;
  id: number;
  rating: number;
  user: {
    id: number;
    name: string;
  };
}

export interface ISendComment {
  comment: string;
  rating: number;
}
