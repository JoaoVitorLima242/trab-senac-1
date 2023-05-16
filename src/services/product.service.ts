import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  createProduct(): string {
    return 'Hello World!';
  }
}
