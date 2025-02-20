import { RootState } from "../../store/store";

export const selectCartItems = (state: RootState) => state.cart.items;
export const selectTotalCartPrice = (state: RootState) => state.cart.totalCartPrice;
