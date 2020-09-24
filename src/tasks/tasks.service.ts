import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { NodemailerService } from 'src/nodemailer/nodemailer.service';
import { TelegramService } from 'src/telegram/telegram.service';

@Injectable()
export class TasksService {
    constructor(private readonly telegram: TelegramService,
         private readonly mail: NodemailerService) { }

    @Cron('00 30 8 * * *') // every 8:30 AM it will execute program. Format XX(sec).XX(min).XX(hour)
    handleCron() {
        console.log(`\n|${new Date().toLocaleTimeString()}| \nSuccess Sent TasksService`);
        this.telegram.botSendMessage(); // to telegram
        this.mail.example(); // to email
    }
}
