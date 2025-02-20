import { useMutation, useQuery } from "@tanstack/react-query";
import { addToWishlist, deleteWishlist, getWishlist } from "../api/endpoints/wishlist";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { IsAuthenticated } from "../features/auth/authSelectors";
import { useEffect } from "react";
import { removeWishlistItem, setWishlist } from "../features/wishlist/wishlistSlice";

const useWishlist = () => {
  const token = useSelector(IsAuthenticated);
  const dispatch = useDispatch();
  const wishlistMutation = useMutation({
    mutationFn: (productId: string) => addToWishlist(productId, token),
    onSuccess: () => {
      toast.success("Item add to Wishlist successfully!");
    },
  });

  const wishlistQuery = useQuery({
    queryKey: ["wishDetails", token],
    queryFn: () => getWishlist(token),
  });

  useEffect(() => {
    if (wishlistQuery.data?.data) {
      dispatch(setWishlist(wishlistQuery.data.data));
    }
  }, [wishlistQuery.data, dispatch]);

  const wishlistDelete = useMutation({
    mutationFn: (productId: string) => deleteWishlist(productId, token),
    onSuccess: (_, productId) => {
      toast.success("Item deleted from Wishlist successfully!");
      dispatch(removeWishlistItem(productId));
    },
  });
  const isProductInWishlist = (productId: string) => {
    const wishlist = wishlistQuery.data?.data || [];
    return wishlist.some((item) => item._id === productId);
  };
  return {
    wishlistAdd: wishlistMutation,
    wishlistGet: wishlistQuery,
    deleteWishlist: wishlistDelete,
    isProductInWishlist,
  };
};

export default useWishlist;
