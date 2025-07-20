import Dexie, { type Table } from 'dexie';

export const db = new Dexie('BubbleTeaDB') as Dexie & {
  bubbleTeas: Table<BubbleTea, number>;
  cart: Table<CartItem, number>;
};

db.version(1).stores({
  bubbleTeas: '++id, name, isListed',
  cart: 'id, quantity'
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
}
