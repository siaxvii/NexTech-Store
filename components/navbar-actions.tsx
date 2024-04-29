"use client";
import { Heart } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Button from "@/components/ui/button";
import useCart from "@/hooks/use-cart";
import useWishList from "@/hooks/use-wishlist";

const NavbarActions = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const router = useRouter();
  const cart = useCart();
  const wishlist = useWishList();

  if (!isMounted) {
    return null;
  }

  return ( 
    <div className="ml-auto flex items-center gap-x-4">
      <Button onClick={() => router.push('/wishlist')} className="flex items-center rounded-full bg-black px-4 py-2">
        <Heart
          size={20}
          color="white"
        />
        <span className="ml-2 text-sm font-medium text-white pl-1">
          {wishlist.items.length}
        </span>
      </Button>
      <Button onClick={() => router.push('/cart')} className="flex items-center rounded-full bg-black px-4 py-2">
        <ShoppingCart
          size={20}
          color="white"
        />
        <span className="ml-2 text-sm font-medium text-white pl-1">
          {cart.items.length}
        </span>
      </Button>
    </div>
  );
}
 
export default NavbarActions;