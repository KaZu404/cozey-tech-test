import { Controller, Get } from '@nestjs/common';
import { AppService } from './services/app.service';
import { Order } from './models/order';
import { LineItem } from './models/lineItem';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/customer/line-items')
  getCustomerLineItems(): LineItem[] {
    return this.appService.getLineItems();
  }

  @Get('/packing-team/orders')
  getPackingTeamOrders(): Order[] {
    // TODO: map to a different data model
    return this.appService.getOrders();
  }

  @Get('/product-picking-team/orders-products')
  getOrders(): Order[] {
    // TODO: map to a different data model
    return this.appService.getOrders();
  }
}
