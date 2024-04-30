"use client";

import Container from "@/components/ui/container";

import { useEffect, useState } from "react";
import WishListItem from "./components/wishlist-item";
import useWishList from "@/hooks/use-wishlist";

export const revalidate = 0;

const WishList = () => {
  const wishlist = useWishList();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) { return null; }

  return ( 
    
    <div className="bg-white">
      <Container>
        <div className="px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-black">
            Your Wishlist
          </h1>
          <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
            <div className="lg:col-span-7">
              {wishlist.items.length === 0 && <p className="text-neutral-500">No items added to wishlist.</p>}
              <ul>
                {wishlist.items.map((item) => (
                  <WishListItem key={item.id} data={item}/>
                ))}
              </ul>
            </div>
          </div>

        </div>

      </Container>
    </div>
   );
}
 
export default WishList;