import {HttpModule, Module} from '@nestjs/common';
import {AuthService} from '../service/auth/auth.service';
import {PassportModule} from '@nestjs/passport';
import {ConfigModule} from '../config/config.module';
import { jwtStrategy } from '../strategy/jwt.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { MatchSchema } from '../schemas/match.schema';
import { UsersService } from '../service/users.service';
import { JwtModule } from '@nestjs/jwt';
import { EventSchema } from '../schemas/event.schema';
import { EventsService } from '../service/events.service';
import { MatchesService } from '../service/matches.service';
import { MatchesController } from '../controllers/matches/matches.controller';
import { UserSchema } from '../schemas/user.schema';
import { ConfigService } from '../config/config.service';

@Module({
    imports: [
        HttpModule, 
        PassportModule.register({defaultStrategy: 'jwt', session: true}), 
        ConfigModule,
        MongooseModule.forFeature([
            { name: 'Match', schema: MatchSchema },
            { name: 'Event', schema: EventSchema },
            { name: 'User', schema: UserSchema }
        ]),
        JwtModule.registerAsync({
            imports:[ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get('SECRET'),
                signOptions: { expiresIn: '60s' },
            }),
            inject: [ConfigService]
        }),
    ],
    controllers: [MatchesController],
    providers: [AuthService, jwtStrategy, UsersService, EventsService, MatchesService],
    exports: [AuthService, UsersService, EventsService, MatchesService],
})
export class MatchesModule {

}
