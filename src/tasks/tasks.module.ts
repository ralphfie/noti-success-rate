import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { NodemailerModule } from 'src/nodemailer/nodemailer.module';
import { TelegramModule } from 'src/telegram/telegram.module';
import { TasksService } from './tasks.service';

@Module({
  imports: [ScheduleModule.forRoot(),TelegramModule,NodemailerModule],
  providers: [TasksService]
})
export class TasksModule {}
