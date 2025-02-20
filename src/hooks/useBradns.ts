import { useQuery } from "@tanstack/react-query";
import { Brands } from "../api/endpoints/brands";

const useBrands = () => {
  const BrandsQuery = useQuery({
    queryKey: ["categories"],
    queryFn: Brands,
  });

  return {
    Brands: BrandsQuery,
  };
};

export default useBrands;
