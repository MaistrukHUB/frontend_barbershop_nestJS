import { Outlet, Navigate } from "react-router-dom";
import { useAdmin } from '../hook';

const PrivetAdmin = () => {
  const user = useAdmin();
  return user.role === "admin"? <Outlet /> : <Navigate  to={'/'}/>;
}

export default PrivetAdmin