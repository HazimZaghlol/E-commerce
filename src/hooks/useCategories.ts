import { useQuery } from "@tanstack/react-query";
import { categories } from "../api/endpoints/categories";

const useCategory = () => {
  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: categories,
  });

  return {
    categories: categoriesQuery,
  };
};

export default useCategory;
