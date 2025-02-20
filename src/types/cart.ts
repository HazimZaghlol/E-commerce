export type ProductCartItem = {
  count: number;
  _id: string;
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
  price: number;
};
