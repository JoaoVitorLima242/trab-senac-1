import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateProductDto } from 'src/dto/createProduct';
import { UpdateProductDto } from 'src/dto/updateProductDto';
import { Product } from 'src/entities/Product';
import { ProductService } from 'src/services/product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  FindAll(): Product[] {
    return this.productService.findAll();
  }

  @Get(':id')
  FindOne(@Param('id') id: number): Product {
    return this.productService.findOne(id);
  }

  @Post()
  Create(@Body() body: CreateProductDto): string {
    return this.productService.createProduct(body);
  }

  @Put(':id')
  Update(@Param('id') id: number, @Body() body: UpdateProductDto) {
    return this.productService.updateOne(id, body);
  }

  @Delete(':id')
  DeleteOne(@Param('id') id: number): string {
    return this.productService.deleteOne(id);
  }
}
