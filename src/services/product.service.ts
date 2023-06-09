import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from 'src/dto/createProduct';
import { UpdateProductDto } from 'src/dto/updateProductDto';
import { Product } from 'src/entities/Product';

@Injectable()
export class ProductService {
  private products: Product[] = [
    {
      id: Math.ceil(Math.random() * 1000),
      title: 'Computador',
      price: 1000.0,
      category: 'Eletronico',
    },
  ];

  createProduct(createCourseDto: CreateProductDto): string {
    const id = Math.ceil(Math.random() * 1000);

    const newProduct: Product = {
      id,
      ...createCourseDto,
    };

    this.products.push(newProduct);

    Logger.log(newProduct);

    return 'Produto criado com suceso!';
  }

  findAll(): Product[] {
    return this.products;
  }

  findOne(id: number): Product {
    const product = this.products.find((i) => i.id === Number(id));

    if (!product) {
      throw new NotFoundException('Produto não foi encontrado');
    }

    return this.products.find((i) => i.id === Number(id));
  }

  deleteOne(id: number): string {
    const product = this.products.find((i) => i.id === Number(id));

    if (!product) {
      throw new NotFoundException('Produto não foi encontrado');
    }

    const newProducts = this.products.filter((i) => i.id !== Number(id));

    this.products = newProducts;

    return `Produto ID: ${id} foi deletado com sucesso!`;
  }

  updateOne(id: number, updateProductDto: UpdateProductDto) {
    const oldProduct = this.products.find((i) => i.id === Number(id));

    if (!oldProduct) {
      throw new NotFoundException('Produto não foi encontrado');
    }

    const updatedProduct = {
      id,
      ...oldProduct,
      ...updateProductDto,
    };

    const newArr = this.products.filter((i) => i.id !== Number(id));

    newArr.push(updatedProduct);

    this.products = newArr;

    return `Produto ID:${id} atualizado com sucesso!`;
  }
}
