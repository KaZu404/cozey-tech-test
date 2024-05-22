import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './services/app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  it('should return a list of 3 line items for the customer to pick from', () => {
    const result = appController.getCustomerLineItems();

    expect(result).toHaveLength(3);
  });

  it('should return a list of 4 products for the picking team with the first one having only 1 occurence', () => {
    const result = appController.getProductPickingTeamOrdersProducts();

    expect(result).toHaveLength(4);
    expect(result[0].count).toBe(1);
  });

  it('should return a list of 3 orders for the packing team', () => {
    const result = appController.getPackingTeamOrders();

    expect(result).toHaveLength(3);
  });
});
