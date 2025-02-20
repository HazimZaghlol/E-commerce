import { useQuery, useMutation } from "@tanstack/react-query";
import { LoginVerified, VisaSubmit } from "../api/endpoints/order";
import { IsAuthenticated } from "../features/auth/authSelectors";
import { orderSubmit } from "../api/endpoints/order";
import { ShippingAddress } from "../types/order";
import { getCartDetails } from "../api/endpoints/cart";
import { toast } from "react-toastify";

const useOrder = () => {
  const token = IsAuthenticated();

  const TokenQuery = useQuery({
    queryKey: ["tknVerify", token],
    queryFn: () => LoginVerified(token),
    enabled: !!token,
  });

  const cartQuery = useQuery({
    queryKey: ["cartDetails", token],
    queryFn: () => getCartDetails(token),
  });

  const SubmitOrderMutation = useMutation({
    mutationFn: ({ shippingAddress }: { shippingAddress: ShippingAddress }) => orderSubmit(cartQuery.data?._id, shippingAddress, token),
    onSuccess: () => {
      cartQuery.refetch();
      toast.success("Order submitted successfully!", { autoClose: 1000 });
    },
    onError: (error) => {
      console.error("Error submitting order:", error.message);
    },
  });

  const VisaOrderMutation = useMutation({
    mutationFn: ({ shippingAddress }: { shippingAddress: ShippingAddress }) => VisaSubmit(cartQuery.data?._id, shippingAddress, token),
    onSuccess: (data) => {
      console.error("Error submitting order:", data);
    },
    onError: (error) => {
      console.error("Error submitting order:", error.message);
    },
  });

  return {
    tknVerify: TokenQuery,
    submitOrder: SubmitOrderMutation,
    VisaMutation: VisaOrderMutation,
  };
};

export default useOrder;
