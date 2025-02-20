import React from "react";
import useCart from "../../hooks/useCart";
import { Link } from "react-router";
import { CartProduct } from "../../types/cart";
import { Loading } from "../common/Loading";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems, selectTotalCartPrice } from "../../features/cart/cartSelectors";
import { updateCartItemCount } from "../../features/cart/cartSlice";
import { syncWithServerPrice } from "../../features/cart/cartSlice";
import useWishlist from "../../hooks/useWishlist";

const Cart: React.FC = () => {
  const { cartDetails, updateItem, CartDeleteItem } = useCart();
  const { wishlistAdd, isProductInWishlist } = useWishlist();
  const cartItems = useSelector(selectCartItems);
  const totalCartPrice = useSelector(selectTotalCartPrice);

  const dispatch = useDispatch();

  const handleIncrement = (productId: string, cartID: string) => {
    const item = cartItems.find((item) => item._id === cartID);
    if (item) {
      dispatch(
        updateCartItemCount({
          cartId: cartID,
          count: item.count + 1,
        })
      );

      updateItem.mutate(
        {
          productId,
          newCount: item.count + 1,
        },
        {
          onSuccess: (data) => {
            if (data.totalCartPrice) {
              dispatch(syncWithServerPrice(data.totalCartPrice));
            }
          },
          onError: () => {
            dispatch(
              updateCartItemCount({
                cartId: cartID,
                count: item.count,
              })
            );
          },
        }
      );
    }
  };

  const handleDecrement = (productId: string, cartID: string) => {
    const item = cartItems.find((item) => item._id === cartID);
    if (item && item.count > 1) {
      dispatch(
        updateCartItemCount({
          cartId: cartID,
          count: item.count - 1,
        })
      );
      updateItem.mutate(
        {
          productId,
          newCount: item.count - 1,
        },
        {
          onSuccess: (data) => {
            if (data.totalCartPrice) {
              dispatch(syncWithServerPrice(data.totalCartPrice));
            }
          },
          onError: () => {
            dispatch(
              updateCartItemCount({
                cartId: cartID,
                count: item.count,
              })
            );
          },
        }
      );
    }
  };
  return (
    <section className="bg-gray-50 py-8 antialiased dark:bg-gray-900 md:py-16 ">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mb-4 items-end justify-between space-y-4 sm:flex sm:space-y-0 md:mb-8">
          <div>
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                <li className="inline-flex items-center">
                  <Link to="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-primary-600 dark:text-gray-400 dark:hover:text-white">
                    <svg className="me-2.5 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                    </svg>
                    Home
                  </Link>
                </li>
                <li>
                  <div className="flex items-center">
                    <svg className="h-5 w-5 text-gray-400 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m9 5 7 7-7 7" />
                    </svg>
                    <Link to="/products" className="ms-1 text-sm font-medium text-gray-700 hover:text-primary-600 dark:text-gray-400 dark:hover:text-white md:ms-2">
                      Products
                    </Link>
                  </div>
                </li>
                <li>
                  <div className="flex items-center">
                    <svg className="h-5 w-5 text-gray-400 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m9 5 7 7-7 7" />
                    </svg>
                    <a href="#" className="ms-1 text-sm font-medium text-gray-700 hover:text-primary-600 dark:text-gray-400 dark:hover:text-white md:ms-2">
                      Cart
                    </a>
                  </div>
                </li>
              </ol>
            </nav>
          </div>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Shopping Cart</h2>
        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            <div className="space-y-6">
              {/* Handle loading state */}
              {cartDetails.isLoading && <Loading />}

              {/* Handle error state */}
              {cartDetails.isError && <div>Error loading cart details.</div>}

              {/* Handle empty cart */}
              {!cartDetails.isLoading && !cartDetails.isError && !cartDetails.data?.products?.length && <div>Your cart is empty.</div>}

              {/* Render cart products */}
              {cartItems.map((product: CartProduct) => (
                <div key={product._id} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                  <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                    <a href="#" className="shrink-0 md:order-1">
                      <img className="h-20 w-20 dark:hidden" src={product.product.imageCover} alt={product.product.title} />
                      <img className="hidden h-20 w-20 dark:block" src={product.product.imageCover} alt={product.product.title} />
                    </a>

                    <label htmlFor="counter-input" className="sr-only">
                      Choose quantity:
                    </label>
                    <div className="flex items-center justify-between md:order-3 md:justify-end">
                      <div className="flex items-center">
                        <button
                          onClick={() => handleDecrement(product._id, product._id)}
                          type="button"
                          id="decrement-button"
                          className="cursor-pointer inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                        >
                          <svg className="h-2.5 w-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                          </svg>
                        </button>
                        <input
                          type="text"
                          id="counter-input"
                          className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white"
                          value={product.count || 0}
                          required
                          readOnly
                        />
                        <button
                          onClick={() => handleIncrement(product.product._id, product._id)}
                          type="button"
                          id="increment-button"
                          className="cursor-pointer inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                        >
                          <svg className="h-2.5 w-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                          </svg>
                        </button>
                      </div>
                      <div className="text-end md:order-4 md:w-32">
                        <p className="text-base font-bold text-gray-900 dark:text-white">EGP {product.price * product.count}</p>
                      </div>
                    </div>

                    <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                      <Link to={`/products/${product.product._id}`} className="text-base font-medium text-gray-900 hover:underline dark:text-white">
                        {product.product.title}
                      </Link>
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => wishlistAdd.mutate(product.product._id)}
                          type="button"
                          className="cursor-pointer inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white"
                        >
                          {isProductInWishlist(product.product._id) ? (
                            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                              <path d="m12.75 20.66 6.184-7.098c2.677-2.884 2.559-6.506.754-8.705-.898-1.095-2.206-1.816-3.72-1.855-1.293-.034-2.652.43-3.963 1.442-1.315-1.012-2.678-1.476-3.973-1.442-1.515.04-2.825.76-3.724 1.855-1.806 2.201-1.915 5.823.772 8.706l6.183 7.097c.19.216.46.34.743.34a.985.985 0 0 0 .743-.34Z" />
                            </svg>
                          ) : (
                            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                              <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                              />
                            </svg>
                          )}
                          Add to Favorites
                        </button>

                        <button
                          type="button"
                          className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500 cursor-pointer"
                          onClick={() => CartDeleteItem.mutate(product.product._id)}
                        >
                          <svg className="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18 17.94 6M18 18 6.06 6" />
                          </svg>
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Order summary */}
          <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
            <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
              <p className="text-xl font-semibold text-gray-900 dark:text-white">Order summary</p>
              <div className="space-y-4">
                <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                  <dt className="text-base font-bold text-gray-900 dark:text-white">Total</dt>
                  <dd className="text-base font-bold text-gray-900 dark:text-white">EGP {totalCartPrice}</dd>
                </dl>
              </div>
              <Link
                to="/orders"
                className={`flex w-full items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium text-white focus:outline-none focus:ring-4 ${
                  cartItems.length > 0
                    ? "bg-primary-700 hover:bg-primary-800 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    : "bg-gray-400 cursor-not-allowed dark:bg-gray-700"
                }`}
                onClick={(e) => {
                  if (cartItems.length === 0) {
                    e.preventDefault();
                  }
                }}
              >
                Proceed to Checkout
              </Link>

              <div className="flex items-center justify-center gap-2">
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400"> or </span>
                <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500">
                  Continue Shopping
                  <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 12H5m14 0-4 4m4-4-4-4" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
