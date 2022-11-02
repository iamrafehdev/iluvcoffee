import {Module} from '@nestjs/common';
import {AppController} from "../app.controller";
import {CoffeesService} from "./coffees.service";
import {CoffeesController} from "./coffees.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {CoffeeEntity} from "./entities/coffee.entity";

@Module({
    imports: [TypeOrmModule.forFeature([CoffeeEntity]),],
    controllers: [CoffeesController],
    providers: [CoffeesService]
})
export class CoffeesModule {
}
