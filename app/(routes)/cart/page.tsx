"use client";

import Container from "@/components/ui/container";
import useCart from "@/hooks/use-cart";
import { useEffect, useState } from "react";
import CartItem from "./components/cart-item";
import Summary from "./components/summary";

const CartPage = () => {
  const cart = useCart();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) { return null; }

  return ( 
      <Container>
        <div className="px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold" tabIndex={0}>
            Shopping Cart ({cart.items.length})
          </h1>
          
          
          <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
            <div className="lg:col-span-7">
              {cart.items.length === 0 && <p className="text-neutral-500">No items added to cart.</p>}
              <ul>
                {cart.items.map((item, index) => (
                  <div key={item.id} tabIndex={0} aria-label={`Cart Item number ${index + 1}`}>
                    <span className="sr-only"> number {index + 1} </span>
                    <CartItem key={item.id} data={item}/>
                  </div>
                ))}
              </ul>
            </div>
            
            <Summary />
          </div>

        </div>
      </Container>
   );
}
 
export default CartPage;