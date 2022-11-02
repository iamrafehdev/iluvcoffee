import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query} from '@nestjs/common';
import {CoffeesService} from "./coffees.service";
import {CreateCoffeeDto} from "./dto/create-coffee.dto";
import {UpdateCoffeeDto} from "./dto/update-coffee.dto";

@Controller('coffees')
export class CoffeesController {
    constructor(private readonly coffeesService: CoffeesService) {
    }

    @Get()
    findAll() {
        return this.coffeesService.findAll()
    }

    @Get('pagination')
    findAllWithPagination(@Query() paginateQuery) {
        const {limit, offset} = paginateQuery
        return `This function return all coffees. limit ${limit}, offset ${offset}`
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.coffeesService.findOne(id)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() createCoffeeDto: CreateCoffeeDto) {
        console.log(createCoffeeDto instanceof CreateCoffeeDto)
        return this.coffeesService.create(createCoffeeDto)
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateCoffeeDto: UpdateCoffeeDto) {
        return this.coffeesService.update(id, updateCoffeeDto)
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.coffeesService.remove(id)
    }
}
