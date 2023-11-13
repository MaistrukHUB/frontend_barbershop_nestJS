import React, { ReactNode } from "react";
import { Header, Footer } from "../../components"; // Ваш компонент хедера

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
