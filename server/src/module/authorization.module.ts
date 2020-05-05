import {HttpModule, Module} from '@nestjs/common';
import {AuthService} from '../service/auth/auth.service';
import {PassportModule} from '@nestjs/passport';
import {AuthController} from '../controllers/auth/auth.controller';
import {ConfigModule} from '../config/config.module';
import { jwtStrategy } from '../strategy/jwt.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../schemas/user.schema';
import { UsersService } from '../service/users.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '../config/config.service';

@Module({
    imports: [
        HttpModule, 
        PassportModule.register({defaultStrategy: 'jwt', session: true}), 
        ConfigModule,
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
        JwtModule.registerAsync({
            imports:[ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get('SECRET'),
                signOptions: { expiresIn: '60s' },
            }),
            inject: [ConfigService]
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, jwtStrategy, UsersService],
    exports: [AuthService, UsersService],
})
export class AuthorizationModule {

}
