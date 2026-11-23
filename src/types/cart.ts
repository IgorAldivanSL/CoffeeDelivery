import { Coffee } from './coffee';

export interface CartItem {
  coffee: Coffee;
  quantity: number;
}

export type PaymentMethod = 'credit' | 'debit' | 'cash';

export interface DeliveryAddress {
  cep: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  uf: string;
}

export interface OrderSnapshot {
  id: string;
  items: CartItem[];
  itemsSubtotalInCents: number;
  deliveryFeeInCents: number;
  totalInCents: number;
  address: DeliveryAddress;
  paymentMethod: PaymentMethod;
  createdAt: string;
}
