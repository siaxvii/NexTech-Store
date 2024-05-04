import React from "react";
import ProductCard from "@/components/ui/product-card";
import { Product } from "@/types";
import NoResults from "@/components/ui/no-results";

interface DiscountProductsProps {
  title: string;
  items: Product[];
}

const DiscountProducts: React.FC<DiscountProductsProps> = ({ title, items }) => {
  // Filter discounted products
  const discountedProducts = items.filter((item) => item.isDiscounted);

  return (
    <div className="space-y-4">
      <h3 className="font-bold text-3xl" tabIndex={0}>{title}</h3>
      {discountedProducts.length === 0 && <NoResults />}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {discountedProducts.map((item) => (
          <ProductCard key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
};

export default DiscountProducts;
