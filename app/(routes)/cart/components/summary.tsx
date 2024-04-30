"use client";
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import axios from "axios";
import { MouseEventHandler, useEffect } from "react";  
import { useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";

import Button from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";

const Summary = () => {


  const searchParams = useSearchParams();
  const cart = useCart();
  const removeAll = useCart((state) => state.removeAll);

  useEffect(() => {
    if (searchParams.get("success")) {
      toast.success("Payment completed!");
      removeAll();
    }

    if (searchParams.get("canceled")) {
      toast.error("Payment process cancelled.");
    }

  }, [searchParams, removeAll])

  const subtotal = cart.items.reduce((total, item) => {
    return total + (+item.price);
  }, 0);

  const totalSaved = cart.items.reduce((total, item) => {
    if (item.isDiscounted) {
      const originalPrice = +item.price;
      const discountedPrice = originalPrice - (originalPrice * (+item.discountPercentage / 100));
      const savedAmount = originalPrice - discountedPrice;
      return total + savedAmount;
    }
    return total;
  }, 0);

  const modifiedItems = cart.items.map((item) => {
    const discountedPrice = item.isDiscounted
      ? +item.price * (1 - +item.discountPercentage / 100) : +item.price;
    
    return {
      ...item, price: discountedPrice,
    };
  });

  const totalPrice = modifiedItems.reduce((total, item) => {
    return total + item.price;
  }, 0);

  const onCheckout = async () => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
      productIds: modifiedItems.map((item) => item.id),
    });
    
    window.location = response.data.url;
  }

  const openToast: MouseEventHandler<HTMLButtonElement> = (event) => {
    toast.error("Please sign in to checkout!");
  };

  return ( 
    <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">

      <h2 className="text-lg font-medium text-gray-900">
        Order Summary
        </h2>
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between border-t border-gray-200 pt-4">
            <div className="text-base font-medium text-gray-900">
              Subtotal
            </div>
            <Currency value={subtotal}/>
          </div>
          <div className="flex justify-between items-center pt-4">
            <div className="text-base font-medium text-gray-900">
              You Saved
            </div>
            <div className="flex font-bold items-center">
              <span className="mr-1">-</span><Currency value={totalSaved}/>
            </div>
          </div>
          <div className="flex items-center justify-between border-t border-gray-200 pt-10">
            <div className="text-xl font-bold text-gray-900">
              Order Total
            </div>
            <div className="text-xl font-bold text-gray-900">
              <Currency value={totalPrice}/>
            </div>
            
          </div>
        </div>
        <SignedIn>
          <Button disabled={modifiedItems.length === 0} onClick={onCheckout} className="w-full mt-6">
            Checkout
          </Button>
        </SignedIn>
        <SignedOut>
          <Button disabled={modifiedItems.length === 0} onClick={openToast} className="w-full mt-6">
            Checkout
          </Button>
        </SignedOut>
    </div>
   );
}
 
export default Summary;