import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectCartItems, selectTotalCartPrice } from "../../features/cart/cartSelectors";
import { Link } from "react-router-dom"; // Corrected import for Link
import useOrder from "../../hooks/useOrder";

const Order: React.FC = () => {
  const cartItems = useSelector(selectCartItems);
  const totalCartPrice = useSelector(selectTotalCartPrice);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const { VisaMutation, submitOrder } = useOrder();

  return (
    <>
      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        <form action="#" className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Order summary</h2>
            <div className="mt-6 space-y-4 border-b border-t border-gray-200 py-8 dark:border-gray-700 sm:mt-8">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Billing &amp; Delivery information</h4>
              <dl>
                <dt className="text-base font-medium text-gray-900 dark:text-white">Individual</dt>
                <dd className="mt-1 text-base font-normal text-gray-500 dark:text-gray-400">01284594422 ,cairo ,madinat Nasr</dd>
              </dl>
              <button onClick={toggleModal} type="button" className="text-base font-medium text-primary-700 hover:underline dark:text-primary-500">
                Edit
              </button>
            </div>
            <div className="mt-6 sm:mt-8">
              <div className="relative overflow-x-auto border-b border-gray-200 dark:border-gray-800">
                <table className="w-full text-left font-medium text-gray-900 dark:text-white md:table-fixed">
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                    {cartItems.length > 0 ? (
                      cartItems.map((item) => (
                        <tr key={item._id}>
                          <td className="whitespace-nowrap py-4 md:w-[384px]">
                            <div className="flex items-center gap-4">
                              <a href="#" aria-label={`View details for ${item.product?.title || "Unnamed Product"}`} className="flex items-center aspect-square w-10 h-10 shrink-0">
                                <img className="h-auto w-full max-h-full dark:hidden" src={item.product?.imageCover || "default-image-light.svg"} alt={item.product?.title || "Product Image"} />
                                <img className="hidden h-auto w-full max-h-full dark:block" src={item.product?.imageCover || "default-image-dark.svg"} alt={item.product?.title || "Product Image"} />
                              </a>
                              <a href="#" aria-label={`Product link: ${item.product?.title || "Unnamed Product"}`} className="hover:underline">
                                {item.product?.title.split(" ").slice(0, 3).join(" ") || "Unnamed Product"}
                              </a>
                            </div>
                          </td>
                          <td className="p-4 text-base font-normal text-gray-900 dark:text-white">x{item.count}</td>
                          <td className="p-4 text-right text-base font-bold text-gray-900 dark:text-white">
                            {new Intl.NumberFormat("en-US", {
                              style: "currency",
                              currency: "EGP",
                            }).format(item.price * item.count)}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={3} className="py-4 text-center text-gray-500 dark:text-gray-400">
                          Your cart is empty.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 space-y-6">
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white">Order summary</h4>
                <div className="space-y-4">
                  <div className="space-y-2"></div>
                  <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                    <dt className="text-lg font-bold text-gray-900 dark:text-white">Total</dt>
                    <dd className="text-lg font-bold text-gray-900 dark:text-white">
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "EGP",
                      }).format(totalCartPrice)}
                    </dd>
                  </dl>
                </div>
                <div className="gap-4 sm:flex sm:items-center">
                  <button
                    type="button"
                    className="cursor-pointer w-full rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                  >
                    <Link to="/products">Return to Shopping</Link>
                  </button>
                  <button
                    onClick={(event) => {
                      event.preventDefault();
                      submitOrder.mutate({
                        shippingAddress: {
                          details: "TestTestTest",
                          phone: "01284594422",
                          city: "Cairo",
                        },
                      });
                    }}
                    type="button"
                    className="cursor-pointer mt-4 flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 sm:mt-0"
                  >
                    Buy in Cash
                  </button>
                  <button
                    onClick={(event) => {
                      event.preventDefault();
                      VisaMutation.mutate(
                        {
                          shippingAddress: {
                            details: "TestTestTest",
                            phone: "01284594422",
                            city: "Cairo",
                          },
                        },
                        {
                          onSuccess: (data) => {
                            if (data.status === "success" && data.session?.url) {
                              // Redirect user to the payment session URL
                              window.location.href = data.session.url;
                            } else {
                              console.error("Failed to create a payment session.");
                            }
                          },
                          onError: (error) => {
                            console.error("Error during payment session creation:", error);
                          },
                        }
                      );
                    }}
                    type="button"
                    className="cursor-pointer mt-4 flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 sm:mt-0"
                  >
                    Buy with Visa
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
      {isModalOpen && (
        <div id="billingInformationModal" tabIndex={-1} aria-hidden="true" className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative max-w-lg w-full p-4">
            <div className="relative rounded-lg bg-white shadow dark:bg-gray-800">
              <div className="flex items-center justify-between rounded-t border-b border-gray-200 p-4 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Billing Information</h3>
                <button
                  onClick={toggleModal}
                  type="button"
                  className="ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <svg className="h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <form className="p-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-5">
                  <div className="sm:col-span-2">
                    <label htmlFor="phone-input_billing_modal" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                      Phone Number*
                    </label>
                    <input
                      type="text"
                      id="phone-input_billing_modal"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      placeholder="123-456-7890"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="select_city_input_billing_modal" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                      City*
                    </label>
                    <input
                      type="text"
                      id="select_city_input_billing_modal"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      placeholder="City Name"
                      required
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="address_billing_modal" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                      Shipping Address*
                    </label>
                    <textarea
                      id="address_billing_modal"
                      rows={4}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      placeholder="Enter your address"
                    ></textarea>
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-4 dark:border-gray-700">
                  <button
                    type="submit"
                    className="me-2 inline-flex items-center rounded-lg bg-primary-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Save information
                  </button>
                  <button
                    onClick={toggleModal}
                    type="button"
                    className="me-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Order;
