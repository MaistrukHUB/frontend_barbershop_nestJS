export interface IPropsLogin {
  serverError: any;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  navigate: (to: string) => void;
  handelSubmit: (e: React.FormEvent) => Promise<any>;
  validationErrors: { [key: string]: string };
}
export interface IPropsRegister {
  serverError: any;
  setEmail: (value: string) => void;
  setName: (value: string) => void;
  setPhone: (value: number) => void;
  setPassword: (value: string) => void;
  setRepeatPassword: (value: string) => void;
  navigate: (to: string) => void;
  handelSubmit: (e: React.FormEvent) => Promise<any>;
  validationErrors: { [key: string]: string };
}

export interface IAuthState {
  token: string;
  user: IPublicUser;
  isLogged: boolean;
}

interface ICartProducts {
  id: number | null;
  img: string;
  name: string;
  category: string;
  extent: number | null;
  count: number | null;
  cost: number | null;
  createdAt: string;
  updatedAt: string;
  cart: number | null;
}

interface ICart {
  id: number | null;
  createdAt: string;
  updateAt: string;
  user: number | null;
  cartProducts: [ICartProducts];
}

export interface IPublicUser {
  id: number | null;
  name: string;
  phone: number | null;
  email: string;
  role: string;
  createdAt: string;
  updateAt: string;
  cart: [ICart];
}
