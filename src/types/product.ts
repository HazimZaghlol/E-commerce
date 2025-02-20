export interface Product {
  product: {
    subcategory: {
      _id: string;
      name: string;
      slug: string;
      category: string;
    }[];
    _id: string;
    title: string;
    quantity: number;
    imageCover: string;
    category: {
      _id: string;
      name: string;
      slug: string;
      image: string;
    };
    brand: {
      _id: string;
      name: string;
      slug: string;
      image: string;
    };
    ratingsAverage: number;
    id: string;
  };
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
