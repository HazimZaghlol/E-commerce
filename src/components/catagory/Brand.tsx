import React from "react";
import { Link } from "react-router";
import { Loading } from "../common/Loading";
import useBrands from "../../hooks/useBradns";
import { Brand } from "../../types/brand";

const Brands: React.FC = () => {
  const { Brands } = useBrands();

  const BrandsData = Brands.data?.data || [];

  return (
    <section className="bg-gray-50 py-8 antialiased dark:bg-gray-900 md:py-16">
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
                    <a href="#" className="ms-1 text-sm font-medium text-gray-700 hover:text-primary-600 dark:text-gray-400 dark:hover:text-white md:ms-2">
                      Brands
                    </a>
                  </div>
                </li>
              </ol>
            </nav>
          </div>
        </div>
        <div className="mb-4 flex items-center justify-between gap-4 md:mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Shop by Brands</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Brands.isLoading ? (
            <Loading />
          ) : (
            BrandsData.map((Brands: Brand) => (
              <Link
                key={Brands._id}
                to={`/${Brands.slug}`}
                className="flex flex-col items-center rounded-lg border border-gray-200 bg-white px-4 py-6 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <img src={Brands.image} alt={Brands.name} className="mb-3 h-20  rounded-md object-cover" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">{Brands.name}</span>
              </Link>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Brands;
