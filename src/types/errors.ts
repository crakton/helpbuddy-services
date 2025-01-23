export type TResponseError = {
  success: boolean;
  message: string;
  error: {
    statusCode: number;
    data: unknown;
    message: string;
  };
};
