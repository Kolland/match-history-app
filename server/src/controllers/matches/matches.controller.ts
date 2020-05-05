import {Controller, Logger, UseGuards, Get, Req, Res, HttpException, HttpStatus} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {Response} from 'express';
import {ConfigService} from '../../config/config.service';
import { MatchesService } from 'src/service/matches.service';
import { EventsService } from 'src/service/events.service';

@Controller('matches')
export class MatchesController {
    config: ConfigService;

    constructor(
        config: ConfigService,
        private matchesService: MatchesService, 
        private eventsService: EventsService
    ) {
        this.config = config;
    }

    @Get('')
    @UseGuards(AuthGuard('jwt'))
    async getMatches(@Req()req, @Res() res: Response) {
        Logger.log('Get Matches Started');
        
        try {
            const matches = await this.matchesService.getAll();

            return res.send(matches);
        } catch (e) {
            Logger.log(e);
            throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @Get(':id/events')
    @UseGuards(AuthGuard('jwt'))
    async getMatchEvents(@Req()req, @Res() res: Response) {
        console.log('Get Match Events Started');

        try {
            const events = await this.eventsService.getAll();
        
            return res.send(events);
        } catch (e) {
            Logger.log(e);
            throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
