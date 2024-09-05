export type TLogin = {
  email: string,
  password: string
}

export type TUser = {
  id?: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  role: 'admin' | 'user';
  address: string;
}
