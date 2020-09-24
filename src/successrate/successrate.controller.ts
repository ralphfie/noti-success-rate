import { ClassSerializerInterceptor, Controller, Get, UseInterceptors } from '@nestjs/common';
import {  SuccessrateService } from './successrate.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Success Rate')
@Controller('successrate')
export class SuccessrateController {
    constructor(private readonly client: SuccessrateService ) {}
    
     // Poller success rate for Fiber
     @Get('fiber-data')
     @UseInterceptors(ClassSerializerInterceptor)
     getSuccessRateFiber():Promise<String>{
       return this.client.getSuccessRateFiber();
     }
     
     // Poller success rate for Copper
     @Get('copper-data')
     @UseInterceptors(ClassSerializerInterceptor)
     getSuccessRateCopper():Promise<String>{
       return this.client.getSuccessRateCopper();
     }
}