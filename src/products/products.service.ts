import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './product.model';
import { Model } from 'mongoose'
@Injectable()
export class ProductsService {
  private products: Product[] = [];

  constructor(@InjectModel('Product') private readonly productModel: Model<Product>) {}

  async insertProduct(title: string, desc: string, price: number) {
    const newProduct = new this.productModel({title, description: desc, price});
    const result = await newProduct.save();
    // this.products.push(newProduct);
    return result.id;
  }

  async getProducts() {
    const result = this.productModel.find();
    return result;
  }

  async getSingleProduct(productId: string) {
    const result = await this.productModel.findById(productId);
    return result;
  }

  async updateProduct(productId: string, title: string, desc: string, price: number) {
    var update = {title: title, description: desc, price: price};
    if (title === undefined) {
      delete update.title
    }
    if (desc === undefined) {
      delete update.description
    }
    if (price === undefined) {
      delete update.price
    }
    const result = await this.productModel.findByIdAndUpdate(productId, update)
    return result
  }

  async deleteProduct(productId: string) {
      const result = await this.productModel.deleteOne({_id: productId})
      return result;;
  }

}
