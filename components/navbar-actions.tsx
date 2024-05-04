"use client";
import { Heart } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Button from "@/components/ui/o_button";
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

  if (!isMounted) { return null; }

  return ( 
    <div className="ml-auto flex items-center gap-x-4 mr-4">
      <Button onClick={() => router.push('/wishlist')} aria-label="Wishlist" className="flex items-center border-gray rounded-full px-4 py-2 hover:opacity-80">
        <Heart
          size={20}
          color="white"
        />
        <span className="ml-2 text-sm font-medium pl-1">
          {wishlist.items.length}
        </span>
      </Button>
        <Button onClick={() => router.push('/cart')} aria-label="Shopping Cart" className="flex items-center border-gray rounded-full px-4 py-2 hover:opacity-80">
          <ShoppingCart
            size={20}
            color="white"
          />
          <span className="ml-2 text-sm font-medium pl-1">
            {cart.items.length}
          </span>
        </Button>
    </div>
  );
}
 
export default NavbarActions;