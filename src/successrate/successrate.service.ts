import { HttpService, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { OutputEntity } from './entities/output.entitiy';

// Authorization token. Get from https://camelia.tm.com.my/monitoring/schedulersr
const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJSMTAyMTgiLCJpYXQiOjE2MDA5Mjk4NzcsImV4cCI6MTYwMDkzMzQ3N30.UwgZ_G-bYppNAEBD6fI4gcppHjB2kd0l8_W88lzfuxw';
// Request URL. Get from https://camelia.tm.com.my/monitoring/schedulersr
const fiberHttp = 'https://camelia.tm.com.my:1880/fylia/api/report/scheduler_successrate_service?date=24-09-2020';
const copperHttp = 'https://camelia.tm.com.my:1880/dylia/api/report/scheduler_successrate_service?date=24-09-2020&network=all';

@Injectable()
export class SuccessrateService {
    constructor(private readonly client:HttpService){}
    // Function for Fiber
    async getSuccessRateFiber(){
        try {
            const obs$ = this.client.get(
              fiberHttp,
              {
                headers: {Authorization:token}
              }
            );
           const output = await obs$.toPromise();
           const test = plainToClass(OutputEntity,output.data) ;
           const lowfiber = [];
           //console.log("\n Low Percentange(Less than 90) :- \n");
           test.data.forEach(element => {
               if (element.poller_success_rate < 90) {
                
                   let region = element.region
                   switch(region){
                     case "CT1":
                      lowfiber.push(`Region : Central 1    (${element.poller_success_rate}%) \n`)
                      break;
                     case "CT2":
                      lowfiber.push(`Region : Central 2   (${element.poller_success_rate}%) \n`)
                      break;
                     case "ES":
                      lowfiber.push(`Region : Eastern      (${element.poller_success_rate}%) \n`)
                      break;
                     case "NT":
                      lowfiber.push(`Region : Northern  (${element.poller_success_rate}%) \n`)
                      break;
                     case "SB":
                      lowfiber.push(`Region : Sabah         (${element.poller_success_rate}%) \n`)
                      break;
                     case "SR":
                      lowfiber.push(`Region : Sarawak     (${element.poller_success_rate}%) \n`)
                      break;
                     case "ST":
                      lowfiber.push(`Region : Southern   (${element.poller_success_rate}%) \n`)
                      break;
                     default:
                       console.log("Error");
                       break;
                    }
                   }
           });
          //var myJSON = JSON.stringify(low)  //convert object to json
          //console.log(myJSON)
          //console.log(lowfiber);
          return lowfiber
        } catch (e) {return e}}
        
        //Function for Copper
        async getSuccessRateCopper(){
          try {
              const obs$ = this.client.get(
                copperHttp,
                {
                  headers: {Authorization:token}
                }
              );
             const output = await obs$.toPromise();
             const test = plainToClass(OutputEntity,output.data) ;
             const lowcopper = [];

             test.data.forEach(element => {
                 if (element.poller_success_rate < 85) {
                  
                     let region = element.region
                     switch(region){
                       case "CT1":
                        lowcopper.push(`Region : Central 1    (${element.poller_success_rate}%) \n`)
                        break;
                       case "CT2":
                        lowcopper.push(`Region : Central 2   (${element.poller_success_rate}%) \n`)
                        break;
                       case "ES":
                        lowcopper.push(`Region : Eastern      (${element.poller_success_rate}%) \n`)
                        break;
                       case "NT":
                        lowcopper.push(`Region : Northern  (${element.poller_success_rate}%) \n`)
                        break;
                       case "SB":
                        lowcopper.push(`Region : Sabah         (${element.poller_success_rate}%) \n`)
                        break;
                       case "SR":
                        lowcopper.push(`Region : Sarawak     (${element.poller_success_rate}%) \n`)
                        break;
                       case "ST":
                        lowcopper.push(`Region : Southern   (${element.poller_success_rate}%) \n`)
                        break;
                       default:
                         console.log("Error");
                         break;
                      }
                     }
             });
            return lowcopper
          } catch (e) {return e}
    }
}