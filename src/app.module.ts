import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

const URI = 'mongodb://root:mongo@mongo-dev:27017/users-dev?authSource=admin';

@Module({
  imports: [MongooseModule.forRoot(URI), UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
