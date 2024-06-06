import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Sale, findSaleByParams } from './sale';
import { SaleEntity } from 'src/db/entities/sale.entity';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SaleService {

    constructor(
        @InjectRepository(SaleEntity)
        private readonly saleRepository : Repository<SaleEntity>
    ){}

    async createSale(sale : Sale) : Promise<Sale>{
        const saleToSave : Partial<SaleEntity> = {
            userId : sale.userId,
            totalPrice : sale.totalPrice,
            updatedAt : sale.updatedAt,
            status : sale.status
        }
        
        const createdSale = await this.saleRepository.save(saleToSave);
        return this.mapEntity(createdSale);
    }

    async findAllSale(params : findSaleByParams) : Promise<Sale[]>{
        const searchParams : FindOptionsWhere<SaleEntity> = {}

        if(params.id)
            searchParams.id = Like(`%${params.id}%`);

        if(params.userId)
            searchParams.userId = Like(`%${params.userId}%`);

        if(params.status)
            searchParams.status = params.status;

        const saleFound = await this.saleRepository.find({
            where : searchParams
        })

        return saleFound.map(sale => this.mapEntity(sale));
    }

    async findSalebyId(id : string) : Promise<Sale>{
        const saleFound = await this.saleRepository.findOne({
            where : { id }
        })

        if(!saleFound)
            throw new HttpException(`Id not found!`, HttpStatus.NOT_FOUND);
        
        return this.mapEntity(saleFound);
    }

    async updateSale(id : string, sale : Sale){
        const saleFound = await this.saleRepository.findOne({
            where : { id }
        })

        if(!saleFound)
            throw new HttpException(`Id not found!`, HttpStatus.NOT_FOUND);

        await this.saleRepository.update(id, this.mapToDataEntity(sale));
    }

    async deleteSale(id : string){
        const result = await this.saleRepository.delete(id);
        
        if (!result.affected)
            throw new HttpException(`Sale not found.`, HttpStatus.NOT_FOUND);

    }

    private mapEntity(sale : SaleEntity) : Sale{
        return {
            id : sale.id,
            userId : sale.userId,
            totalPrice : sale.totalPrice,
            updatedAt : sale.updatedAt,
            status : sale.status
        }
    }

    private mapToDataEntity(sale : Sale) : Partial<SaleEntity>{
        return {
            userId : sale.userId,
            totalPrice : sale.totalPrice,
            updatedAt : sale.updatedAt,
            status : sale.status
        }
    }
}