import { Product } from "@/types";
import qs from "query-string";

const URL=`${process.env.NEXT_PUBLIC_API_URL}/products`;

interface Query {
  categoryId?: string;
  colorId?: string;
  isFeatured?: boolean;
  description?: string;
  price?: string;
  sortBy?: 'asc' | 'desc';
  search?: string;
}

const getProducts = async (query: Query): Promise<Product[]> => {
    let url: string = URL;
    let queryString: any = { 
      colorId: query.colorId,
      categoryId: query.categoryId,
      isFeatured: query.isFeatured,
      description: query.description,
      sortBy: query.sortBy,
      search: query.search,
    };
  

    if (query.price && query.sortBy) {
      queryString = {
        ...queryString,
        _sort: 'price', // Specify the field to sort by
        _order: query.sortBy, // Specify the order of sorting
      };
    }

    url = qs.stringifyUrl({
      url,
      query: queryString,
    });
  
  const res = await fetch(url);

  return res.json();
};

export default getProducts;