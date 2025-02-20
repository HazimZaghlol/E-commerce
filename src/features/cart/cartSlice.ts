import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductCartItem } from "../../types/cart";

interface CartState {
  items: ProductCartItem[];
  totalCartPrice: number;
  serverTotalPrice: number;
}

interface UpdateCartItemCountPayload {
  cartId: string;
  count: number;
}

interface CartDetailsPayload {
  products: ProductCartItem[];
  totalCartPrice: number;
}

const initialState: CartState = {
  items: [],
  totalCartPrice: 0,
  serverTotalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartDetails: (state, action: PayloadAction<CartDetailsPayload>) => {
      state.items = action.payload.products;
      state.totalCartPrice = action.payload.totalCartPrice;
      state.serverTotalPrice = action.payload.totalCartPrice;
    },

    updateCartItemCount: (state, action: PayloadAction<UpdateCartItemCountPayload>) => {
      const { cartId, count } = action.payload;
      const itemToUpdate = state.items.find((item) => item._id === cartId);
      if (itemToUpdate) {
        const oldCount = itemToUpdate.count;
        itemToUpdate.count = count;
        const priceDifference = itemToUpdate.price * (count - oldCount);
        state.totalCartPrice = state.totalCartPrice + priceDifference;
      }
    },

    syncWithServerPrice: (state, action: PayloadAction<number>) => {
      state.totalCartPrice = action.payload;
      state.serverTotalPrice = action.payload;
    },
    clearProducts: (state) => {
      state.items = [];
    },
  },
});

export const { setCartDetails, updateCartItemCount, syncWithServerPrice, clearProducts } = cartSlice.actions;

export default cartSlice.reducer;
