"use client";

import Image from "next/image";
import { MouseEventHandler } from "react";
import { Expand, Heart, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";

import Currency  from "@/components/ui/currency";
import IconButton  from "@/components/ui/icon-button";
import usePreviewModal from "@/hooks/use-preview-modal";
import useCart from "@/hooks/use-cart";
import useWishList from "@/hooks/use-wishlist";
import { Product } from "@/types";


interface ProductCard {
  data: Product
}

const ProductCard: React.FC<ProductCard> = ({
  data
}) => {
  const previewModal = usePreviewModal();
  const cart = useCart();
  const router = useRouter();
  const wishlist = useWishList();

  const handleClick = () => {
    router.push(`/product/${data?.id}`);
  };

  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();

    previewModal.onOpen(data);
  };

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();

    cart.addItem(data);
  };

  const onSaveToWishlist: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();

    wishlist.addItem(data);
  };

  const renderPrice = () => {
    if (data.isDiscounted && data.discountPercentage) {

      const discountedPrice = data.price * (1 - data.discountPercentage / 100);
      return (
        <>
        <div className="flex items-center">
          <span className="bg-green-600 text-white px-2 py-1 rounded-md">
            {data.discountPercentage}% off
          </span>
          <span className="pl-2 line-through text-gray-500">
            <Currency value={data.price} />
          </span>
          
        </div>
          <span className="ml-1">
            <Currency value={discountedPrice} />
          </span>
        
      </>
      );
    } else {
      return <Currency value={data.price} />;
    }
  };
  
  return ( 
    <div onClick={handleClick} className="group cursor-pointer rounded-xl border-2 p-3 space-y-4">
      {/* Image & actions */}
      <div className="aspect-square transition rounded-xl relative">
          <Image 
            src={data.images?.[0]?.url} 
            alt="" 
            fill
            className="aspect-square object-cover rounded-md group-hover:opacity-80"
          />
        <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
          <div className="flex gap-x-6 justify-center">
            <IconButton 
              onClick={onPreview} 
              icon={<Expand size={20} className="text-gray-600" />}
            />
            <IconButton
              onClick={onAddToCart} 
              icon={<ShoppingCart size={20} className="text-gray-600" />} 
            />
            <IconButton
              onClick={onSaveToWishlist} 
              icon={<Heart size={20} className="text-gray-600" />} 
            />
          </div>
        </div>
      </div>
      {/* Description */}
      <div>
        <p className="font-semibold text-lg">{data.name}</p>
        <p className="text-sm text-gray-500">{data.category?.name}</p>
      </div>
      {/* Price & Review */}
      <div className="flex items-center justify-between">
        {renderPrice()}
      </div>
    </div>
  );
}

export default ProductCard;