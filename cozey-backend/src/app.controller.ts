import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { AppService } from './services/app.service';
import { CustomerOrderDto, Order } from './models/order';
import { LineItem } from './models/lineItem';
import { Product } from './models/product';

import { randomUUID } from 'crypto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/customer/line-items')
  getCustomerLineItems(): LineItem[] {
    return this.appService.getLineItems();
  }

  @Post('/customer/order')
  postCustomerOrder(@Body() customerOrder: CustomerOrderDto) {
    if (customerOrder.lineItems.length === 0) {
      throw new BadRequestException({
        message: 'No items in order, please select one',
      });
    }

    const lineItems = this.appService.getLineItems();

    const orderLineItems = customerOrder.lineItems.map((orderLineItemUuid) =>
      lineItems.find(({ uuid }) => uuid === orderLineItemUuid),
    );

    this.appService.postOrder({
      uuid: randomUUID(),
      total: orderLineItems.reduce((current, next) => current + next.price, 0),
      date: new Date(),
      shippingAddress: customerOrder.shippingAddress,
      customerName: customerOrder.customerName,
      customerEmail: customerOrder.customerEmail,
      lineItems: orderLineItems,
    });
  }

  @Get('/packing-team/orders')
  getPackingTeamOrders(): Order[] {
    return this.appService.getOrders();
  }

  @Get('/product-picking-team/orders-products')
  getProductPickingTeamOrdersProducts(): { product: Product; count: number }[] {
    const orders = this.appService.getOrders();

    const allProductsInOrders = orders
      .map(({ lineItems }) => lineItems)
      .reduce((previous, current) => [...previous, ...current])
      .map(({ products }) => products)
      .reduce((previous, current) => [...previous, ...current]);

    const resultProductList: { product: Product; count: number }[] = [];

    allProductsInOrders.forEach((productInOrder) => {
      const productInResultList = resultProductList.find(
        (productInList) => productInList.product.uuid === productInOrder.uuid,
      );
      if (productInResultList) {
        productInResultList.count++;
      } else {
        resultProductList.push({ product: productInOrder, count: 1 });
      }
    });

    return resultProductList;
  }
}
