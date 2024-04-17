export interface Product {
    id: string;
    category: Category;
    name: string;
    description: string;
    price: number;
    isFeatured: boolean;
    isDiscounted: boolean;
    discountPercentage: number;
    color: Color;
    images: Image[]
  };
  
  export interface Image {
    id: string;
    url: string;
  }
  
  export interface Billboard {
    id: string;
    label: string;
    imageUrl: string;
  };
  
  export interface Category {
    id: string;
    name: string;
    billboard: Billboard;
  };
  
  export interface Color {
    id: string;
    name: string;
    value: string;
  };