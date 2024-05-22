import { Controller, Get } from '@nestjs/common';
import { AppService } from './services/app.service';
import { Order } from './models/order';
import { LineItem } from './models/lineItem';
import { Product } from './models/product';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/customer/line-items')
  getCustomerLineItems(): LineItem[] {
    return this.appService.getLineItems();
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
