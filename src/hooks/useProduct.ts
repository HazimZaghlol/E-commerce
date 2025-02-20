import { useQuery } from "@tanstack/react-query";
import { fetchProductList, fetchSingleProduct } from "../api/endpoints/products";

const useProduct = () => {
  const allProductsQuery = useQuery({
    queryKey: ["products"],
    queryFn: fetchProductList,
  });

  const useSingleProduct = (id: string) => {
    return useQuery({
      queryKey: ["product", id],
      queryFn: () => fetchSingleProduct(id),
      enabled: !!id,
    });
  };

  return { allProductsQuery, useSingleProduct };
};

export default useProduct;
