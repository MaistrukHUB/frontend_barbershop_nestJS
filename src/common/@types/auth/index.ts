export interface IPropsLogin {
  setPassword: (value: string) => void;
  setEmail: (value: string) => void;
  navigate: (to: string) => void;
  handelSubmit: (value: any) => any;
}
export interface IPropsRegister {
  setEmail: (value: string) => void;
  setName: (value: string) => void;
  setPhone: (value: number) => void;
  setPassword: (value: string) => void;
  setRepeatPassword: (value: string) => void;
  navigate: (to: string) => void;
  handelSubmit: (value: any) => any;
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

interface IPublicUser {
  id: number | null;
  name: string;
  phone: number | null;
  email: string;
  role: string;
  createdAt: string;
  updateAt: string;
  cart: [ICart];
}
