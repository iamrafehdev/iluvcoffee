import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {CoffeesModule} from './coffees/coffees.module';
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
    imports: [TypeOrmModule.forRoot(
        {
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'softsuite',
            database: 'postgres',
            autoLoadEntities: true,
            synchronize: true,
        }
    ), CoffeesModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
