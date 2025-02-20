import React from "react";
import ProductCard from "./ProductCard";
import useProduct from "../../hooks/useProduct";
import { Product } from "../../types/product";
import { Loading } from "../common/Loading";
import { Link } from "react-router";

const ProductList: React.FC = () => {
  const { allProductsQuery } = useProduct();
  const { data: products, isLoading } = allProductsQuery;
  const productList = Array.isArray(products) ? products : products?.data || [];

  return (
    <>
      <section className="bg-gray-50 py-8 antialiased dark:bg-gray-900 md:py-12">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
              {/* Heading & Filters */}
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
                          <a href="#" className="ms-1 text-sm font-medium text-gray-700 hover:text-primary-600 dark:text-gray-400 dark:hover:text-white md:ms-2">
                            Products
                          </a>
                        </div>
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>

              <div className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
                {productList?.map((product: Product) => (
                  <ProductCard key={product._id} props={product} />
                ))}
              </div>
            </div>
          </>
        )}
      </section>
    </>
  );
};
export default ProductList;
