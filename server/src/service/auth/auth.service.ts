import { Injectable, HttpException, HttpStatus} from '@nestjs/common';
import {ConfigService} from '../../config/config.service';
import { User } from '../../interfaces/user.interface';
import { UsersService } from '../users.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    config: ConfigService;

    constructor(
        config: ConfigService, 
        private usersService: UsersService,
        private jwtService: JwtService
    ) {
        this.config = config;
    }

    async validateUser(email: string, pass: string): Promise<User> {
        const user = await this.usersService.findOne(email);

        if(!user) {
            throw new HttpException('Wrong email or password', HttpStatus.UNAUTHORIZED);
        }

        const isPaswordValid = await compare(pass, user.password);
        if (isPaswordValid) {
          const { password, ...result } = user.toObject();
          return result;
        } else {
            throw new HttpException('Wrong email or password', HttpStatus.UNAUTHORIZED);
        }
    }



    async login(email: string, id: string) {
        const payload = { email: email, sub: id };
        return {
          accessToken: this.jwtService.sign(payload),
        };
      }

}
