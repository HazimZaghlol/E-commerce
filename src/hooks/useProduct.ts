import { useQuery } from "@tanstack/react-query";
import { fetchProductList, fetchSingleProduct } from "../api/endpoints/products";

const useProduct = () => {
  const allProductsQuery = useQuery({
    queryKey: ["products"],
    queryFn: fetchProductList,
  });

  const SingleProduct = (id: string) => {
    return useQuery({
      queryKey: ["product", id],
      queryFn: () => fetchSingleProduct(id),
      enabled: !!id,
    });
  };

  return { allProductsQuery, SingleProduct };
};

export default useProduct;
