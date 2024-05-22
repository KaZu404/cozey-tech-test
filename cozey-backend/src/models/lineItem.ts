import { Product } from './product';

export class LineItem {
  uuid: string;
  name: string;
  price: number;
  products: Product[];
}
