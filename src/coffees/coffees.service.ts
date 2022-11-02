import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {CoffeeEntity} from "./entities/coffee.entity"
import {CreateCoffeeDto} from "./dto/create-coffee.dto";
import {UpdateCoffeeDto} from "./dto/update-coffee.dto";
import {FlavorEntity} from "./entities/flavor.entity";


@Injectable()
export class CoffeesService {
    // private coffees: CoffeeEntity[] = [
    //     {
    //         id: 1,
    //         name: 'Test',
    //         brand: 'Test Brand',
    //         flavors: ['Choclate', 'Vanilla']
    //     },
    // ]

    constructor(@InjectRepository(CoffeeEntity)
                private readonly coffeeRepository: Repository<CoffeeEntity>,
                @InjectRepository(FlavorEntity)
                private readonly flavorRepository: Repository<FlavorEntity>,) {
    }

    findAll() {
        return this.coffeeRepository.find({
            relations: ['flavors']
        })
    }

    async findOne(id: string) {
        // const coffee = await this.coffeeRepository.findOneBy({id: +id})
        const coffee = await this.coffeeRepository.findOne({
                where: {id: +id},
                relations: ['flavors'],
            }
        )
        if (!coffee) {
            throw new NotFoundException(`Coffee #${id} not found`)
        }
        return coffee
    }

    async create(createCoffeeDto: CreateCoffeeDto) {
        const flavors = await Promise.all(
            createCoffeeDto.flavors.map(name => this.preloadFlavorByName(name))
        )
        const coffee = this.coffeeRepository.create({...createCoffeeDto, flavors})
        return this.coffeeRepository.save(coffee);
    }

    async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
        const flavors = updateCoffeeDto.flavors && (await Promise.all(
                updateCoffeeDto.flavors.map(name => this.preloadFlavorByName(name)))
        )
        const coffee = await this.coffeeRepository.preload({
            id: +id, ...updateCoffeeDto, flavors
        })
        if (!coffee) {
            throw new NotFoundException(`Coffee #${id} not found`)
        }
        return this.coffeeRepository.save(coffee)
    }


    async remove(id: string) {
        const coffee = await this.findOne(id)
        return this.coffeeRepository.remove(coffee)
    }

    private async preloadFlavorByName(name: string): Promise<FlavorEntity> {
        const existingFlavor = await this.flavorRepository.findOne({
            where: {name: name}
        })
        if (existingFlavor) {
            return existingFlavor
        }
        return this.flavorRepository.create({name})
    }

}
