"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Heart, ShoppingCart } from "lucide-react";
import Currency from "@/components/ui/currency";
import Button from "@/components/ui/o_button";
import { Product } from "@/types";
import useCart from "@/hooks/use-cart";
import { MouseEventHandler } from "react";
import useWishlist from "@/hooks/use-wishlist";

interface InfoProps { data: Product; ignoreTheme?: boolean}

const Info: React.FC<InfoProps> = ({ data, ignoreTheme }) => {
  const cart = useCart();
  const wishlist = useWishlist();
  const { theme } = useTheme();
  const [textColor, setTextColor] = useState<string>("text-black");

  useEffect(() => {
    if(!ignoreTheme){
      setTextColor(theme === "light" ? "text-black" : "text-white");
    }
  }, [theme, ignoreTheme]);

  const onAddToCart = () => { cart.addItem(data); };

  const onSaveToWishlist: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    wishlist.addItem(data);
  };

  return (
    <div>
      <h1 className={`text-3xl font-bold ${textColor}`} tabIndex={0}>{data.name}</h1>
      <div className="mt-3 flex items-end justify-between">
        <div className={`text-2xl ${textColor}`} tabIndex={0}>
          <span className='sr-only'> Price </span>
          {renderPrice()}
        </div>
      </div>
      <hr className="my-4" />
      <div className="flex flex-col gap-y-6">
        <div className="flex items-center gap-x-4" tabIndex={0}>
          <h3 className={`font-semibold ${textColor}`} aria-hidden="true">Color:</h3>
          <div
            className="h-6 w-6 rounded-full border border-gray-600"
            style={{ backgroundColor: data?.color?.value }}
          />
          <span className='sr-only'> Color: {data?.color?.name} </span>
        </div>
        <div className="flex items-start gap-x-4">
          <h3 className={`font-semibold ${textColor}`}> Description: </h3>
          <h3 className={textColor} tabIndex={0}>
            <span className='sr-only'> Description.. </span>
            {data.description}
          </h3>
        </div>
      </div>
      <div className="mt-10 flex items-center gap-x-3">
        <Button
          onClick={onAddToCart}
          className={`flex items-center gap-x-2 border-white text-white hover:bg-accent hover:text-accent-foreground`}
        >
          Add To Cart
          <ShoppingCart size={20} />
        </Button>
        <Button
          onClick={onSaveToWishlist}
          className={`flex items-center gap-x-2 border-white text-white hover:bg-accent hover:text-accent-foreground`}
        >
          Add to Wishlist
          <Heart size={20} />
        </Button>
      </div>
    </div>
  );

  function renderPrice() {
    if (data.isDiscounted && data.discountPercentage) {
      const discountedPrice =
        data.price * (1 - data.discountPercentage / 100);
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
  }
};

export default Info;
