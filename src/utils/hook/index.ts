import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAuth = () => {
  const { isLogged } = useAppSelector((state) => state.auth);
  return isLogged;
};

export const useAdmin = () => {
  const { user } = useAppSelector((state) => state.auth);
  return user.role
};
