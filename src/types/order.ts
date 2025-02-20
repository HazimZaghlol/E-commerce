export interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image?: string;
}

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

export interface Product {
  _id: string;
  title: string;
  imageCover: string;
  category: Category;
  brand: Brand;
  ratingsQuantity: number;
  ratingsAverage: number;
  subcategory: Subcategory[];
  id: string;
}

export interface CartItem {
  count: number;
  _id: string;
  product: Product;
  price: number;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

export interface Order {
  shippingAddress: ShippingAddress;
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  _id: string;
  user: User;
  cartItems: CartItem[];
  createdAt: string;
  updatedAt: string;
  id: number;
  __v: number;
}

export type Orders = Order[];
