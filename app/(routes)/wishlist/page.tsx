"use client";

import Container from "@/components/ui/container";

import { useEffect, useState } from "react";
import WishListItem from "./components/wishlist-item";
import useWishList from "@/hooks/use-wishlist";

const WishList = () => {
  const wishlist = useWishList();
  const [isMounted, setIsMounted] = useState(false);
  const itemNum = 0;
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) { return null; }

  return ( 
      <Container>
        <div className="px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold" tabIndex={0}>
            Your Wishlist ({wishlist.items.length})
          </h1>
          <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
            <div className="lg:col-span-7">
              {wishlist.items.length === 0 && <p >No items added to wishlist.</p>}
              <ul>
                {wishlist.items.map((item, index) => (
                  <div key={item.id} tabIndex={0} aria-label={`Wishlist Item number ${index + 1}`}>
                    <span className="sr-only"> number {index + 1} </span>
                    <WishListItem key={item.id} data={item}/>
                  </div>
                ))}
              </ul>
            </div>
          </div>

        </div>

      </Container>
   );
}
 
export default WishList;