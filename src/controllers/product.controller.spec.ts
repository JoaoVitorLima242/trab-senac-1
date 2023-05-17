import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from '../services/product.service';
import { Product } from '../entities/Product';
import { UpdateProductDto } from 'src/dto/updateProductDto';

const updateDto: UpdateProductDto = {
  category: 'food',
  title: 'Pastel de frango',
  price: 10.0,
};

const createDto: UpdateProductDto = {
  category: 'food',
  title: 'Pao de queijo',
  price: 10.0,
};

describe('ProductController', () => {
  let productController: ProductController;
  let productService: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [ProductService],
    }).compile();

    productController = module.get<ProductController>(ProductController);
    productService = module.get<ProductService>(ProductService);
  });

  describe('FindAll', () => {
    it('should return empty array when dont have products', async () => {
      const result = [];
      jest.spyOn(productService, 'findAll').mockImplementation(() => result);

      expect(await productController.FindAll().length).toBe(0);
    });

    it('should return array of products', async () => {
      const result: Product[] = [
        {
          id: 1,
          title: 'Produto 1',
          price: 10,
          category: 'alimento',
        },
        {
          id: 2,
          title: 'Produto 2',
          price: 10,
          category: 'alimento',
        },
        {
          id: 3,
          title: 'Produto 3',
          price: 10,
          category: 'alimento',
        },
      ];
      jest.spyOn(productService, 'findAll').mockImplementation(() => result);

      expect(productController.FindAll().length).toBe(3);
    });
  });

  describe('FindOne', () => {
    it("Should return not found when don't found", async () => {
      try {
        await productController.FindOne(100);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toBe('Produto não foi encontrado');
      }
    });
    it('Should return a product', async () => {
      const result: Product = {
        id: 1,
        title: 'Produto 1',
        price: 10,
        category: 'alimento',
      };

      jest.spyOn(productService, 'findOne').mockImplementation(() => result);

      expect(productController.FindOne(1)).toBe(result);
    });
  });

  describe('Update', () => {
    it("Should return not found when don't found", () => {
      try {
        productController.Update(100, updateDto);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toBe('Produto não foi encontrado');
      }
    });
    it("Should return when product updated 'Produto ID: id atualizado com sucesso!'", () => {
      const result = (id: number) => `Produto ID:${id} atualizado com sucesso!`;

      jest
        .spyOn(productService, 'updateOne')
        .mockImplementation((id: number) => result(id));

      expect(productController.Update(1, updateDto)).toBe(result(1));
    });
  });

  describe('DeleteOne', () => {
    it("Should return not found when don't found", () => {
      try {
        productController.DeleteOne(100);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toBe('Produto não foi encontrado');
      }
    });
    it('Should return Produto ID: ${id} foi deletado com sucesso! when product was deleted', () => {
      const result = (id: number) =>
        `Produto ID: ${id} foi deletado com sucesso!`;

      jest
        .spyOn(productService, 'deleteOne')
        .mockImplementation((id: number) => result(id));

      expect(productController.DeleteOne(1)).toBe(result(1));
    });
  });

  describe('Create', () => {
    it('Should update a product', () => {
      const result = 'Produto criado com suceso!';
      jest
        .spyOn(productService, 'createProduct')
        .mockImplementation(() => result);

      expect(productController.Create(createDto)).toBe(result);
    });
  });
});
