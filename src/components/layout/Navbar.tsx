import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import Logo from "../../assests/images-20250203T130645Z-001/images/freshcart-logo-updated.svg";
import Logo2 from "../../assests/images-20250203T130645Z-001/images/svg.svg";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "../../features/cart/cartSelectors";
import useCart from "../../hooks/useCart";
import { selectIsAuthenticated } from "../../features/auth/authSelectors";
import { logout } from "../../features/auth/authSlice";
import { clearProducts } from "../../features/cart/cartSlice";

const Navbar: React.FC = () => {
  const cartItems = useSelector(selectCartItems) || [];
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignOut = useCallback(() => {
    dispatch(logout());
    dispatch(clearProducts());
    navigate("/", { replace: true });
  }, [dispatch, navigate]);

  const { CartDeleteItem } = useCart();

  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDarkMode]);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setIsDarkMode(storedTheme === "dark");
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const newTheme = !prev;
      localStorage.setItem("theme", newTheme ? "dark" : "light");
      return newTheme;
    });
  };
  return (
    <nav className="bg-white dark:bg-gray-800 antialiased">
      <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="shrink-0">
              <Link to="/">
                <img className="w-full dark:hidden" src={Logo} alt="logo" />
                <img className="hidden w-auto h-8 dark:block" src={Logo2} alt=""></img>
              </Link>
            </div>
            <ul className="hidden lg:flex items-center justify-start gap-6 md:gap-8 py-3 sm:justify-center">
              <li>
                <Link to="/products" className="flex text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/categories" className="flex text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500">
                  categories
                </Link>
              </li>
              <li>
                <Link to="/brands" className="flex text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500">
                  brands
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex items-center lg:space-x-2">
            <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
              <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                {isDarkMode ? (
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 5V3m0 18v-2M7.05 7.05 5.636 5.636m12.728 12.728L16.95 16.95M5 12H3m18 0h-2M7.05 16.95l-1.414 1.414M18.364 5.636 16.95 7.05M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
                  />
                ) : (
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 21a9 9 0 0 1-.5-17.986V3c-.354.966-.5 1.911-.5 3a9 9 0 0 0 9 9c.239 0 .254.018.488 0A9.004 9.004 0 0 1 12 21Z"
                  />
                )}
              </svg>
            </button>
            {/* ---------------------------------------- myCartDropdown -------------------------------- */}
            <button
              id="myCartDropdownButton1"
              data-dropdown-toggle="myCartDropdown1"
              type="button"
              className="inline-flex items-center rounded-lg justify-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm font-medium leading-none text-gray-900 dark:text-white"
            >
              <span className="sr-only">Cart</span>
              <svg className="w-5 h-5 lg:me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"
                />
              </svg>
              <span className="cursor-pointer hidden sm:flex">My Cart</span>
              <svg className="hidden sm:flex w-4 h-4 text-gray-900 dark:text-white ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 9-7 7-7-7" />
              </svg>
            </button>
            <div id="myCartDropdown1" className="hidden z-10 mx-auto max-w-sm space-y-4 overflow-hidden rounded-lg bg-white p-4 antialiased shadow-lg dark:bg-gray-800">
              {isAuthenticated &&
                cartItems?.map((item) => (
                  <div key={item._id} className="grid grid-cols-2">
                    <div>
                      <Link to={`/products/${item._id}`} className="truncate text-sm font-semibold leading-none text-gray-900 dark:text-white hover:underline">
                        {item.product?.title?.split(" ").slice(0, 3).join(" ") || "Unnamed Product"}
                      </Link>
                      <p className="mt-0.5 truncate text-sm font-normal text-gray-500 dark:text-gray-400">$ {item.price * item.count}</p>
                    </div>

                    <div className="flex items-center justify-end gap-6">
                      <p className="text-sm font-normal leading-none text-gray-500 dark:text-gray-400">Qty: {item.count}</p>

                      <button
                        onClick={() => CartDeleteItem.mutate(item.product?._id)}
                        data-tooltip-target={`tooltipRemoveItem${item._id}`}
                        type="button"
                        className="text-red-600 cursor-pointer hover:text-red-700 dark:text-red-500 dark:hover:text-red-600"
                      >
                        <span className="sr-only">Remove</span>
                        <svg className="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                          <path
                            fillRule="evenodd"
                            d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm7.7-3.7a1 1 0 0 0-1.4 1.4l2.3 2.3-2.3 2.3a1 1 0 1 0 1.4 1.4l2.3-2.3 2.3 2.3a1 1 0 0 0 1.4-1.4L13.4 12l2.3-2.3a1 1 0 0 0-1.4-1.4L12 10.6 9.7 8.3Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                      <div
                        id={`tooltipRemoveItem${item._id}`}
                        role="tooltip"
                        className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
                      >
                        Remove item
                        <div className="tooltip-arrow" data-popper-arrow></div>
                      </div>
                    </div>
                  </div>
                ))}

              <Link
                to="/cart"
                className="cursor-pointer mb-2 me-2 inline-flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                role="button"
              >
                See Your Product Cart
              </Link>
            </div>

            <button
              id="userDropdownButton1"
              data-dropdown-toggle="userDropdown1"
              type="button"
              className="cursor-pointer inline-flex items-center rounded-lg justify-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm font-medium leading-none text-gray-900 dark:text-white"
            >
              <svg className="w-5 h-5 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeWidth={2} d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
              Account
              <svg className="w-4 h-4 text-gray-900 dark:text-white ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 9-7 7-7-7" />
              </svg>
            </button>

            <div id="userDropdown1" className="hidden z-10 w-56 divide-y divide-gray-100 overflow-hidden overflow-y-auto rounded-lg bg-white antialiased shadow dark:divide-gray-600 dark:bg-gray-700">
              {isAuthenticated && (
                <ul className="p-2 text-start text-sm font-medium text-gray-900 dark:text-white">
                  <li>
                    <Link to="/wishlist" className="cursor-pointer inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600">
                      Wishlist
                    </Link>
                  </li>
                </ul>
              )}
              <div className="p-2 text-sm font-medium text-gray-900 dark:text-white">
                {isAuthenticated ? (
                  <ul className="p-2 text-start text-sm font-medium text-gray-900 dark:text-white">
                    <li>
                      <button onClick={handleSignOut} className="cursor-pointer inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600">
                        Sign Out
                      </button>
                    </li>
                  </ul>
                ) : (
                  <ul className="p-2 text-start text-sm font-medium text-gray-900 dark:text-white">
                    <li>
                      <Link to="/auth/signin" className="cursor-pointer inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600">
                        Sign In
                      </Link>
                    </li>
                    <li>
                      <Link to="/auth/signup" className="cursor-pointer inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600">
                        Sign Up
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
            </div>

            <button
              type="button"
              data-collapse-toggle="ecommerce-navbar-menu-1"
              aria-controls="ecommerce-navbar-menu-1"
              aria-expanded="false"
              className="cursor-pointer inline-flex lg:hidden items-center justify-center hover:bg-gray-100 rounded-md dark:hover:bg-gray-700 p-2 text-gray-900 dark:text-white"
            >
              <span className="sr-only">Open Menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeWidth={2} d="M5 7h14M5 12h14M5 17h14" />
              </svg>
            </button>
          </div>
        </div>
        <div id="ecommerce-navbar-menu-1" className="bg-gray-50 dark:bg-gray-700 dark:border-gray-600 border border-gray-200 rounded-lg py-3 hidden px-4 mt-4">
          <ul className="text-gray-900  text-sm font-medium dark:text-white space-y-3">
            <li>
              <Link to="/" className="hover:text-primary-700 dark:hover:text-primary-500">
                Home
              </Link>
            </li>
            <li>
              <Link to="/categories" className="hover:text-primary-700 dark:hover:text-primary-500">
                categories
              </Link>
            </li>
            <li>
              <Link to="/brands" className="hover:text-primary-700 dark:hover:text-primary-500">
                brands
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
