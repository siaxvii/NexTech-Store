"use client";

import { ShoppingCart } from "lucide-react";

import Currency  from "@/components/ui/currency";
import Button from "@/components/ui/button";
import { Product } from "@/types";
import useCart from "@/hooks/use-cart";

interface InfoProps {
  data: Product
};

const Info: React.FC<InfoProps> = ({ data }) => {
  const cart = useCart();

  const onAddToCart = () => {
    cart.addItem(data);
  }

  const renderPrice = () => {
    if (data.isDiscounted && data.discountPercentage) {
      const discountedPrice = data.price * (1 - data.discountPercentage / 100);
      return (
        <div className="items-center">
          <span className="p-4 bg-green-600 text-white px-2 py-1 rounded-md mr-2">
            {data.discountPercentage}% off
          </span>
          <div className="flex items-center">
            <span className="font-semibold pt-2 line-through text-gray-500 mr-2">
              <Currency value={data.price} />
            </span>
            <span className="pt-2">
              <Currency value={discountedPrice} />
            </span>
          </div>
        </div>
      );
    } else {
      return <Currency value={data.price} />;
    }
  };
  

  return ( 
    <div>
      <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>
      <div className="mt-3 flex items-end justify-between">
        <p className="text-2xl text-gray-900">
          {renderPrice()}
        </p>
      </div>
      <hr className="my-4" />
      <div className="flex flex-col gap-y-6">
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Color:</h3>
          <div className="h-6 w-6 rounded-full border border-gray-600" style={{ backgroundColor: data?.color?.value }} />
        </div>
        <div className="flex items-start gap-x-4">
          <h3 className="font-semibold text-black">Description:</h3>
          <h3 className="text-black">{data.description}</h3>
        </div>
      </div>
      <div className="mt-10 flex items-center gap-x-3">
        <Button onClick={onAddToCart} className="flex items-center gap-x-2">
          Add To Cart
          <ShoppingCart size={20} />
        </Button>
      </div>
    </div>
  );
}
 
export default Info;