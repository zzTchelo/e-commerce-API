import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Product, findProductByParams } from './product';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from 'src/db/entities/product.entity';
import { FindOptionsWhere, Like, Repository } from 'typeorm';

@Injectable()
export class ProductService {

    constructor(
        @InjectRepository(ProductEntity)
        private readonly productRepository : Repository<ProductEntity>
    ){}

    async createProduct(product : Product) : Promise<Product>{
        const productToSave : ProductEntity = {
            name : product.name,
            description : product.description,
            price : product.price,
            isAvailable : product.isAvailable,
            isHilight : product.isHilight
            //rating : product.rating
        }

        const createdProduct = await this.productRepository.save(productToSave);
        return this.mapEntity(createdProduct);
    }

    async findAllProduct(params : findProductByParams) : Promise<Product[]>{
        const searchParams : FindOptionsWhere<ProductEntity> = {}

        if(params.name)
            searchParams.name = Like(`%${params.name}%`)

        if(params.description)
            searchParams.description = Like(`%${params.description}%`)

        const productFound = await this.productRepository.find({
            where : searchParams
        });

        return productFound.map(product => this.mapEntity(product));
    }

    async findProductbyId(id : string) : Promise<Product>{
        const productFound = await this.productRepository.findOne({
            where : { id }
        });

        if(!productFound)
            throw new HttpException(`Id not found!`, HttpStatus.NOT_FOUND);

        return this.mapEntity(productFound);
    }

    async updateProduct(id : string, product : Product){
        const productFound = await this.productRepository.findOne({
            where : { id }
        });

        if(!productFound)
            throw new HttpException(`Id not found or invalid format!`, HttpStatus.NOT_FOUND);

        await this.productRepository.update(id, this.mapDatatoEntity(product));
    }

    async deleteProduct(id : string){
        const result = await this.productRepository.delete(id);

        if (!result.affected)
            throw new HttpException(`Product not found.`, HttpStatus.NOT_FOUND);
    }

    private mapEntity(product : ProductEntity) : Product{
        return {
            id : product.id,
            name : product.name,
            description : product.description,
            price : product.price,
            isAvailable : product.isAvailable,
            isHilight : product.isHilight
            //rating : product.rating
        }
    }

    private mapDatatoEntity(product : Product) : Partial<ProductEntity>{
        return {
            name : product.name,
            description : product.description,
            price : product.price,
            isAvailable : product.isAvailable,
            isHilight : product.isHilight
            //rating : product.rating
        }
    }
}
