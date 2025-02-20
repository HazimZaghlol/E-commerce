import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addToCart, deleteCartDetails } from "../api/endpoints/cart";
import { getCartDetails } from "../api/endpoints/cart";
import { IsAuthenticated } from "../features/auth/authSelectors";
import { toast } from "react-toastify";
import { setCartDetails } from "../features/cart/cartSlice";
import { useEffect } from "react";
import { updateCartItem } from "../api/endpoints/cart";

import { ProductCartItem } from "../types/cart";

const useCart = () => {
  const token = useSelector(IsAuthenticated);
  const dispatch = useDispatch();

  const queryClient = useQueryClient();
  
  const CartMutation = useMutation({
    mutationFn: (products: ProductCartItem[]) => addToCart(products, token),
    onSuccess: async () => {
      toast.success("Product added to cart successfully!", { autoClose: 1000 });
      queryClient.invalidateQueries({
        queryKey: ["cartDetails", token],
      });
    },
  });

  const cartQuery = useQuery({
    queryKey: ["cartDetails", token],
    queryFn: () => getCartDetails(token),
  });
  useEffect(() => {
    if (cartQuery.data) {
      dispatch(setCartDetails(cartQuery.data));
    }
  }, [cartQuery.data, dispatch]);

  const CartDeleteItem = useMutation({
    mutationFn: (productId: string) => deleteCartDetails(productId, token),
    onSuccess: async () => {
      toast.success("Product deleted successfully!", { autoClose: 1000 });
      queryClient.invalidateQueries({
        queryKey: ["cartDetails", token],
      });
    },
  });

  const CartUpdateItem = useMutation({
    mutationFn: ({ productId, newCount }: { productId: string; newCount: number }) => updateCartItem(productId, newCount, token),
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ["cartDetails", token],
      });
    },
  });

  return {
    addToCart: CartMutation,
    cartDetails: cartQuery,
    CartDeleteItem: CartDeleteItem,
    updateItem: CartUpdateItem,
  };
};

export default useCart;
