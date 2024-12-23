export type IBaseResponse<T> = {
  code: number;
  message: string;
  data: T;
};
