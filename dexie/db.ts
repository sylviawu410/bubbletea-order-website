import Dexie, { type Table } from 'dexie';

export const db = new Dexie('BubbleTeaDB') as Dexie & {
  bubbleTeas: Table<BubbleTea, number>;
  cartItems: Table<CartItem, number>;
};

db.version(1).stores({
  bubbleTeas: '++id, name, price, assetPath, isListed, labels',
  cartItems: 'id, quantity, name, price',
});

export interface BubbleTea {
  id: number;
  name: string;
  isListed: boolean;
  assetPath: string;
  description: string;
  currency: string;
  price: number;
  labels: string[];
}

export interface CartItem {
  id: number;
  quantity: number;
  price: number;
  name: string;
}
