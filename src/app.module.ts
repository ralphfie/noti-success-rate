import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SuccessrateModule } from './successrate/successrate.module';
import { NodemailerModule } from './nodemailer/nodemailer.module';
import { TelegramModule } from './telegram/telegram.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [SuccessrateModule, NodemailerModule, TelegramModule, TasksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
