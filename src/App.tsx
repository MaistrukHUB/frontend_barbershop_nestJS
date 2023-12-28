import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  Home,
  Shop,
  About,
  Academy,
  HistoryOrder,
  SelectedProduct,
  UpdateDatabase,
  Cart,
  AuthRootComponent,
} from "./pages";
import PrivetRouser from "./utils/router/PrivetRouser";
import PrivetAdmin from "./utils/router/PrivetAdmin";
import Layout from "./utils/layout";
import { useAppDispatch, useAppSelector } from "./utils/hook";
import { visibleValue } from "./redux/slice/overflowHidden";
import NotFound from "./pages/notFound";
import { fetchProducts } from "./redux/slice/products";
import { fetchPrice } from "./redux/slice/price";
import { fetchTeammates } from "./redux/slice/team";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { selectFilters } from "./redux/slice/filters";

function App() {
  const isVisible: boolean = useAppSelector(visibleValue);
  const dispatch = useAppDispatch();
  const { selectedCategory, searchValue } =
    useAppSelector(selectFilters);

  React.useEffect(() => {
    dispatch(
      fetchProducts({
        selectedCategory,
        searchValue,
      })
    );
    dispatch(fetchPrice());
    dispatch(fetchTeammates());
    console.log();
  }, []);

  return (
    <div className={`App ${isVisible ? "hidden" : ""}`}>
      <div className='wrapper'>
        <div className='container'>
          <Layout>
            <Routes>
              <Route element={<PrivetRouser />}>
                <Route path='/history' element={<HistoryOrder />} />
                <Route element={<PrivetAdmin />}>
                  <Route
                    path='/updateDatabase'
                    element={<UpdateDatabase />}
                  />
                </Route>
              </Route>
              <Route path='/' element={<Home />} />
              <Route path='login' element={<AuthRootComponent />} />
              <Route
                path='register'
                element={<AuthRootComponent />}
              />
              <Route path='/shop' element={<Shop />} />
              <Route path='/about' element={<About />} />
              <Route path='/academy' element={<Academy />} />
              <Route path='cart' element={<Cart />} />
              <Route
                path='/product/:id'
                element={<SelectedProduct />}
              />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </Layout>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
