import {Controller, Logger, UseGuards, Get, Req, Res, Post, HttpException, HttpStatus} from '@nestjs/common';
import {AuthService} from '../../service/auth/auth.service';
import {AuthGuard} from '@nestjs/passport';
import {Response} from 'express';
import {ConfigService} from '../../config/config.service';
import { genSalt, hash } from 'bcrypt';
import { UsersService } from 'src/service/users.service';

@Controller('auth')
export class AuthController {
    config: ConfigService;

    constructor(
        private readonly service: AuthService, 
        config: ConfigService,
        private usersService: UsersService
    ) {
        this.config = config;
    }

    @Post('sign-in')
    async signIn(@Req()req, @Res() res: Response) {
        Logger.log('Sign-In Started');
        
        try {
            const user = await this.service.validateUser(req.body.email, req.body.password);

            const { accessToken } = await this.service.login(user.email, user._id);
    
            return res.send({
                accessToken,
                ...user
            });
        } catch (e) {
            Logger.log(e);
            const errorToSend = e instanceof HttpException ? e : new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR); 
            res.statusCode = errorToSend.getStatus();
            res.send(e)
        }
    }
    @Post('sign-up')
    async signUp(@Req()req, @Res() res: Response) {
        console.log('Sign-Up Started');

        const isUserExists = await this.usersService.exists(req.body.email);

        if(isUserExists) {
            throw new HttpException('User already exists', HttpStatus.CONFLICT);
        }
        try {
            const salt = await genSalt(10);
            
            const passHash = await hash(req.body.password, salt);
            const user = await this.usersService.create({
                email: req.body.email,
                password: passHash,
            })
        
            return res.send(user);
        } catch (e) {
            Logger.log(e);
            const errorToSend = e instanceof HttpException ? e : new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR); 
            res.statusCode = errorToSend.getStatus();
            res.send(e)
        }
    }
}
