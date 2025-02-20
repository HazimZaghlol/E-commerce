import { createBrowserRouter, RouteObject } from "react-router-dom";

import SignUp from "../pages/auth/SignUp";
import SignIn from "../pages/auth/SignIn";
import { PublicRoute } from "./PublicRoute";
import MainLayout from "../components/layout/MainLayout";
import ProductListPage from "../pages/products/ProductListPage";
import ProductDetailPage from "../pages/products/ProductDetailPage";
import ErrorPage from "../pages/ErrorPage";
import { PrivateRoute } from "./PrivateRoute";
import { CartPage } from "../pages/cart/CartPage";
import WishlistListPage from "../pages/wishlist/WishlistListPage";
import CategoriesPage from "../pages/category/CategoriesPage";
import BrandPage from "../pages/category/BrandPage";
import OrdersPage from "../pages/checkout/Checkout";
import Home from "../pages/Home";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        element: <PrivateRoute />,
        children: [
          {
            path: "/cart",
            element: <CartPage />,
          },
          {
            path: "/wishlist",
            element: <WishlistListPage />,
          },
          {
            path: "/orders",
            element: <OrdersPage />,
          },
        ],
      },
      {
        element: <PublicRoute restricted />,
        children: [
          {
            path: "auth",
            children: [
              {
                path: "signup",
                element: <SignUp />,
              },
              {
                path: "signin",
                element: <SignIn />,
              },
            ],
          },
        ],
      },

      {
        element: <PublicRoute />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "/products",
            element: <ProductListPage />,
          },
          {
            path: "/products/:id",
            element: <ProductDetailPage />,
          },
          {
            path: "/categories",
            element: <CategoriesPage />,
          },
          {
            path: "/brands",
            element: <BrandPage />,
          },
        ],
      },
      {
        path: "404",
        element: <ErrorPage />,
      },
    ],
  },
];
export const router = createBrowserRouter(routes);
