import {Module} from '@nestjs/common';
import {AuthorizationModule} from './module/authorization.module';
import {AppService} from './app.service';
import {AppController} from './app.controller';
import {ConfigModule} from './config/config.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MatchesModule } from './module/matches.module';
import { ConfigService } from './config/config.service';

@Module({
    imports: [
        ConfigModule, 
        AuthorizationModule,
        MatchesModule,
        MongooseModule.forRootAsync({
            imports:[ConfigModule],
            useFactory: async (configService: ConfigService) => ({
              uri: configService.get('DB_CONNECTION_STRING')
            }),
            inject: [ConfigService]
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
