export interface Order {
  id: number;
  productId: number;
  userId: number;
  quantity: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  created: Date;
}
