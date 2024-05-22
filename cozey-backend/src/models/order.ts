import { LineItem } from './lineItem';

export class Order {
  uuid: string;
  total: number;
  date: Date;
  shippingAddress: string;
  customerName: string;
  customerEmail: string;
  lineItems: LineItem[];
}

export class CustomerOrderDto {
  shippingAddress: string;
  customerName: string;
  customerEmail: string;
  lineItems: string[];
}
