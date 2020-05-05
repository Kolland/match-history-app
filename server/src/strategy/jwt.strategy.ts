import { Injectable } from '@nestjs/common';
import { AuthService } from '../service/auth/auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '../config/config.service';

@Injectable()
export class jwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        private readonly authService: AuthService,
        private config: ConfigService,
    ) {
        super({
            secretOrKey: config.get('SECRET'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true
        });
    }

    async validate() {
        return true;
    }
}
