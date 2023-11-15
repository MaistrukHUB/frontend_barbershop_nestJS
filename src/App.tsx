import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages";
import PrivetRouser from "./utils/router/PrivetRouser";
import PrivetAdmin from "./utils/router/PrivetAdmin";
import Layout from "./utils/layout";

function App() {
  return (
    <div className='App'>
      <div className='wrapper'>
        <div className='container'>
          <Layout>
            <Routes>
              <Route element={<PrivetRouser />}>
                {/* роути на які можна зайти будучи залогіненим */}
                <Route element={<PrivetAdmin />}>
                  {/* роути на які можна зайти будучи адміном 'адмінка для додавання і редагування продуктів'*/}
                  </Route>
              </Route>
              <Route path='/' element={<Home />} />
            </Routes>
          </Layout>
        </div>
      </div>
    </div>
  );
}

export default App;
