import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { Product, productRouteParams, findProductByParams } from './product';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {

    constructor(
        private readonly productService : ProductService
    ){}

    @Post()
    async post(@Body() product : Product) : Promise<Product>{
        return await this.productService.createProduct(product);
    }

    @Get()
    async getAll(@Query() params : findProductByParams) : Promise<Product[]>{
        return await this.productService.findAllProduct(params);
    }

    @Get('/:id')
    async getById(@Param('id') id : string) : Promise<Product>{
        return await this.productService.findProductbyId(id);
    }

    @Put('/:id')
    async put(@Param() param : productRouteParams, @Body() product : Product){
        return await this.productService.updateProduct(param.id, product);
    }

    @Delete('/:id')
    async delete(@Param('id') id : string){
        await this.productService.deleteProduct(id);
    }

}
