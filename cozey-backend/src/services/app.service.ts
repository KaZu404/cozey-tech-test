import { Injectable } from '@nestjs/common';
import { Order } from '../models/order';
import { LineItem } from 'src/models/lineItem';

import * as ordersMockDataset from './orders.json';
import * as lineItemsMockDataset from './line-items.json';

@Injectable()
export class AppService {
  orders: Order[] = [];
  lineItems: LineItem[] = [];

  constructor() {
    this.lineItems = lineItemsMockDataset['line-items'];

    this.orders = ordersMockDataset.orders.map((jsonData) => {
      const orderLineItems: LineItem[] = jsonData.lineItems.map((uuid) =>
        this.lineItems.find((lineItem) => lineItem.uuid === uuid),
      );

      return {
        uuid: jsonData.uuid,
        total: orderLineItems.reduce(
          (current, next) => current + next.price,
          0,
        ),
        date: new Date(jsonData.date),
        shippingAddress: jsonData.shippingAddress,
        customerName: jsonData.customerName,
        customerEmail: jsonData.customerEmail,
        lineItems: orderLineItems,
      };
    });
  }

  getOrders(): Order[] {
    return this.orders;
  }

  getLineItems(): LineItem[] {
    return this.lineItems;
  }

  postOrder(newOrder: Order) {
    this.orders.push(newOrder);
  }
}
