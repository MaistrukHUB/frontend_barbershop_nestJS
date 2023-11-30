import {
  useDispatch,
  TypedUseSelectorHook,
  useSelector,
} from "react-redux";
import { AppDispatch, RootState } from "../../redux";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> =
  useSelector;

export const useAuth = () => {
  const { isLogged } = useAppSelector((state) => state.authSlice);
  console.log(isLogged);
  return isLogged;
};

export const useAdmin = () => {
  const { user } = useAppSelector((state) => state.authSlice);
  return user.role;
};

export const useAxiosConfig = () => {
  const { token } = useAppSelector((state) => state.authSlice);
  return {
    headers: {
      Authorization: `Bearer ${token}`, // Замініть yourAuthToken на реальний токен
      "Content-Type": "application/json", // Якщо тип вмісту JSON
    },
  };
};
