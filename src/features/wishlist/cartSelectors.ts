// src/features/wishlist/wishlistSelectors.ts

import { RootState } from "../../store/store";

export const selectWishlistItems = (state: RootState) => state.wishlist.items;
