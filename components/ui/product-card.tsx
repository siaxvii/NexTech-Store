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
          <span className="pl-2 line-through text-gray-500" aria-hidden="true">
            <Currency value={data.price}/>
          </span>
          
        </div>
          <span className="ml-1">
            <span className='sr-only'> Discounted Price </span>
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
          alt={data.name}
          tabIndex={0}
          fill
          className="aspect-square object-cover rounded-md group-hover:opacity-80"
        />
        <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
          <div className="flex gap-x-6 justify-center" tabIndex={1}>
            <IconButton 
              onClick={onPreview} 
              aria-label="Preview"
              ariaLabel="Preview"
              icon={<Expand size={20} className="text-gray-600"/>}
            />
            <IconButton
              onClick={onAddToCart} 
              aria-label="Add to Cart"
              ariaLabel="Add to Cart"
              icon={<ShoppingCart size={20} className="text-gray-600" />} 
            />
            <IconButton
              onClick={onSaveToWishlist} 
              aria-label="Save to Wishlist" 
              ariaLabel="Save to Wishlist"
              icon={<Heart size={20} className="text-gray-600" />} 
            />
          </div>
        </div>
      </div>
      {/* Description */}
      <div aria-label={data.name}>
        <h1 className="font-semibold text-lg" aria-label={data.name}>{data.name}</h1>     
        <p className="text-sm text-gray-500" tabIndex={0}> <span className='sr-only'> Category </span> {data.category?.name} </p>
        
      </div>
      {/* Price & Review */}
      <div className="flex items-center justify-between" tabIndex={0}>
        {renderPrice()}
      </div>
    </div>
  );
}

export default ProductCard;