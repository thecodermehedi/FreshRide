export type TErrorObject = {
  path?: string ;
  message: string;
};

export type TReturnError = {
  code: number;
  message: string;
  details: Array<TErrorObject>;
};
