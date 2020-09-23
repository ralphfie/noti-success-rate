import { Injectable } from '@nestjs/common';
import { SuccessrateService } from 'src/successrate/successrate.service';

// token bot. Get from botFather
const token = '1269618331:AAGC4XVqIxq8AyizGrcoCyD9CDGaE7W4jSU';

// Group ID. Get from https://api.telegram.org/bot<token>/getupdates
const groupid = -452616676;

// telegram global parameter
const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(token, { polling: true });

@Injectable()
export class TelegramService {
    constructor(private readonly successRate: SuccessrateService) { }
    
    // Lifecycle event trigger (Optional)
    onModuleInit() {
        this.botSendMessageRes();
    }
    // Main 
    async botSendMessage() {
        process.env.NTBA_FIX_319 = "1";
        // get data from successrate module
        const fiber: string = await this.successRate.getSuccessRateFiber();
        const copper: string = await this.successRate.getSuccessRateCopper();
        // prefix to send message to telegram
        bot.sendMessage(groupid, `Fiber Poller Success Rate (Less Than 90%) :- \n${fiber}`);
        bot.sendMessage(groupid, `Copper Poller Success Rate (Less Than 85%) :- \n${copper}`);
        //bot.getMe()
        console.log('Success sent Telegram');
    }
    // altenate (User prompt keyword to retrive data)
    async botSendMessageRes(){
        process.env.NTBA_FIX_319 = "1";
        // get data from successrate module
        const fiber: string = await this.successRate.getSuccessRateFiber();
        const copper: string = await this.successRate.getSuccessRateCopper();
        bot.on('message', (msg) => {
            let response = "Help";
            if (msg.text.toString().toLowerCase().includes('help')){
                bot.sendMessage(msg.chat.id, "Hi " + msg.from.first_name + ", please type Success to see the poller success rate. ");
            }
            // execute when user keyin success or Success in telegram
            let response1 = "Success";
            if (msg.text.toString().toLowerCase().includes("success")) {
                bot.sendMessage(msg.chat.id, `Poller Successs Rate for Fiber :-\n ${fiber}\nPoller Success Rate for Copper:-\n${copper}`);
            }
        });
    }

}