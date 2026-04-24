import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "../pages/About";
import Home from "../pages/Home";
import Details from "../pages/Details";
import Categories from "../pages/Categories";
import ShoppingCart from "../pages/ShoppingCart";
import Layout from "../pages/Layout";
import { useCart, CartProvider, CartContextType } from '../contexts/CartContext';
import { useAuth, AuthProvider } from '../contexts/AuthProvider';
import React, { createContext, useContext, ReactNode, useReducer } from 'react';
import Authenticate from "../pages/authentication/Auth";
import ChangePassword from "../pages/Dashboard/ChangePassword";
import DashboardHome from "pages/Dashboard/DashboardHome";
import TerminalsCreate from "pages/Dashboard/Terminals/Create";
import TerminalsList from "pages/Dashboard/Terminals/List";
import TerminalsEdit from "pages/Dashboard/Terminals/Edit";
import PaymentsList from "pages/Dashboard/Payments/List";
import PaymentsCreate from "pages/Dashboard/Payments/Create";
import PaymentsEdit from "pages/Dashboard/Payments/Edit";
import DashboardLayout from "pages/Dashboard/DashboardLayout";
import TransationList from "pages/Dashboard//Transations/List";
import { useLocation } from "react-router-dom";
import { publicPages } from "data";
import PublicForm from "pages/PublicForm"
function NotFound() {
  return (
    <div className="mt-2 relative" style={{ backgroundColor: "#6d8d98" }}>
      <img className="w-350 h-[350px]" src="/imgs/404%20error.jpeg" />
      <div className="absolute text-center text-white inset-x-0 top-[50%] font-bold"> صفحه مورد نظرو نمیتونم پیدا کنم</div>
    </div>)
}

const AppRoutes = () => {
  // const CartContext = createContext<CartContextType | undefined>(undefined);

  return (
    <BrowserRouter>
      <CartProvider>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="categories/:id" element={<Categories />} />
              <Route path="about" element={<About />} />
              <Route path="details/:id" element={<Details />} />
              <Route path="cart" element={<ShoppingCart />} />
              <Route path="authenticate" element={<Authenticate />}></Route>
              {publicPages.map(x => {
                return (<Route path={"/forms/" + x.url} element={<PublicForm />}></Route>);
              })}
              {/* Catch-all 404 route */}
              <Route path="/not-found" element={<NotFound />} />
              <Route path="*" element={<NotFound />} />
            </Route>

            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<DashboardHome />} />
              <Route path="terminals/create" element={<TerminalsCreate />}></Route>
              <Route path="terminals/list" element={<TerminalsList />}></Route>
              <Route path="terminals/edit/:id" element={<TerminalsEdit />}></Route>
              <Route path="payments/list" element={<PaymentsList />}></Route>
              <Route path="payments/create" element={<PaymentsCreate />}></Route>
              <Route path="payments/edit/:id" element={<PaymentsEdit />}></Route>
              <Route path="transations/list" element={<TransationList />}></Route>
              <Route path="changePassword" element={<ChangePassword />}></Route>
            </Route>

          </Routes>
        </AuthProvider>
      </CartProvider>
    </BrowserRouter>
  );
};

export default AppRoutes;
