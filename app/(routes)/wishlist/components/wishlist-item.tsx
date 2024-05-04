"use client";

import Image from "next/image";
import { Heart, ShoppingCart, X } from "lucide-react";

import IconButton from "@/components/ui/icon-button";
import Currency from "@/components/ui/currency";
import useWishList from "@/hooks/use-wishlist";
import { Product } from "@/types";
import Button from "@/components/ui/o_button";
import { MouseEventHandler } from "react";
import useCart from "@/hooks/use-cart";
import toast from "react-hot-toast";

interface WishListItemProps {
  data: Product;
}

const WishListItem:React.FC<WishListItemProps> = ({
  data
}) => {

const wishlist = useWishList();
const cart = useCart();

// Calculate discounted price if product is discounted
const renderPrice = () => {
  if (data.isDiscounted && data.discountPercentage) {

    const discountedPrice = data.price * (1 - data.discountPercentage / 100);
    return (
      <>
      <span>
        <span className="line-through text-gray-500">
          <Currency value={data.price} />
        </span>
        <span>
          <Currency value={discountedPrice} />
        </span>
      </span>
    </>
    );
  } else {
    return <Currency value={data.price} />;
  }
};

const onRemove = () => {
  wishlist.removeItem(data.id);
}

const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();

    cart.addItem(data);
    wishlist.removeItem(data.id);
    toast.dismiss();
    return toast.success('Item moved to cart!');
};

  return (
    <li className="flex py-6 border-b">
      <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
        <Image
          fill
          src={data.images[0].url}
          alt=""
          className="object-cover object-center"
        />
      </div>
      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div className="flex justify-between">
            <p className="text-lg font-semibold" tabIndex={0}>{data.name}</p>
          </div>
          <div className="mt-1 flex text-sm">
            <p className="text-gray-500" tabIndex={0}>{data.color.name}</p>
          </div>
          <div tabIndex={0}>
            <span className='sr-only'> Price: </span>
            {renderPrice()}
          </div>
        </div>
        <div>
          <Button onClick={(onAddToCart)} className="flex items-center bg-gray-100 border-black-50 px-4 py-2">
            <ShoppingCart
              size={20}
              color="black"
            />
            <span className="ml-2 text-sm font-medium text-black pl-1">
              Move to Cart
            </span>
          </Button>
        </div>
        <div className="absolute z-10 right-0 top-0 text-black border-black" tabIndex={1}>
          <IconButton onClick={onRemove} icon={<X size={15} aria-label="Remove Item"/>} />
        </div>
      </div>
    </li>
  );
}
 
export default WishListItem;