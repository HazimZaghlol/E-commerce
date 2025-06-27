"use client";

import { Button } from "@/components/ui/button";
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.actions";
import { Cart, CartItem } from "@/types";
import { Loader, Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { toast } from "sonner";

const AddToCart = ({ cart, item }: { cart?: Cart; item: Omit<CartItem, "cartId"> }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const existItem = cart && cart.items.find((x) => x.productId === item.productId);

  const handleAddToCart = async () => {
    startTransition(async () => {
      const res = await addItemToCart(item);
      if (!res.success) {
        toast.error(res.message);
        return;
      }
      toast.success(res.message, {
        closeButton: true,
        action: {
          label: "Go to cart",
          onClick: () => {
            router.push("/cart");
          },
        },
      });
    });
  };

  const handleRemoveFromCart = async () => {
    startTransition(async () => {
      const res = await removeItemFromCart(item.productId);
      toast(res.message);
      return;
    });
  };

  return existItem ? (
    <div>
      <Button type="button" variant="outline" disabled={isPending} onClick={handleRemoveFromCart}>
        {isPending ? <Loader className="w-4 h-4  animate-spin" /> : <Minus className="w-4 h-4" />}
      </Button>
      <span className="px-2">{existItem.qty}</span>
      <Button type="button" variant="outline" disabled={isPending} onClick={handleAddToCart}>
        {isPending ? <Loader className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
      </Button>
    </div>
  ) : (
    <Button className="w-full" type="button" disabled={isPending} onClick={handleAddToCart}>
      {isPending ? <Loader className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
      Add to cart
    </Button>
  );
};

export default AddToCart;
