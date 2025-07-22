import { db, type CartItem } from '@/dexie/db';

export const CartService = {
    async getCartItems(): Promise<CartItem[]> {
    return await db.cartItems.toArray();
  },

  async addToCart(item: Omit<CartItem, 'quantity'>): Promise<void> {
    const existing = await db.cartItems.get(item.id);
    if (existing) {
      // If the item already exists, increase its quantity
      await db.cartItems.update(item.id, { quantity: existing.quantity + 1 });
    } else {
      // Else, insert as a new item
      await db.cartItems.add({ ...item, quantity: 1 });
    }
  },

  async removeFromCart(id: number): Promise<void> {
    const existing = await db.cartItems.get(id);
    if (existing && existing.quantity > 1) {
      // Decrease the quantity if more than 1
      await db.cartItems.update(id, { quantity: existing.quantity - 1 });
    } else {
      // Remove the item if quantity becomes 0
      await db.cartItems.delete(id);
    }
  },

  async clearCart(): Promise<void> {
    await db.cartItems.clear();
  },

}