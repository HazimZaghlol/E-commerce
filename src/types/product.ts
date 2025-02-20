export interface Product {
  product: any;
  _id: string;
  sold: number;
  title: string;
  price: number;
  quantity: number;
  description: string;
  imageCover: string;
  images: string[];
  ratingsQuantity: number;
  ratingsAverage: number;
  category: {
    _id: string;
    name: string;
    slug: string;
  };
  brand: {
    _id: string;
    name: string;
    slug: string;
  };
}

export interface ProductState {
  products: Product[];
  selectedProduct: Product | null;
}
