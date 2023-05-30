import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './createProduct';

export class UpdateProductDto extends PartialType(CreateProductDto) {}
