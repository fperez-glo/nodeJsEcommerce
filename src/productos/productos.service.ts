import { Injectable } from '@nestjs/common';


const productosDB = ['sku1','sku2','sku3','sku4']

@Injectable()
export class ProductosService {

  create(sku: string) {
    productosDB.push(sku);
    return productosDB;
  }

  findAll() {
    return productosDB;
  }

  findOne(id: number) {
    return `This action returns a #${id} producto`;
  }

  update(id: number, body: string[]) {
    return `This action updates a #${id} producto`;
  }

  remove(id: number) {
    return `This action removes a #${id} producto`;
  }
}
