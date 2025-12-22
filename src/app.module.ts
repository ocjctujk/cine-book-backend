import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { DataSource } from 'typeorm';
import { SeederModule } from './seeder/seeder.module';
import { typeOrmConfig } from './config/typeorm.config';
import { MovieModule } from './movie/movie.module';
import { BookingModule } from './booking/booking.module';
import { ShowModule } from './show/show.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UsersModule,
    SeederModule,
    MovieModule,
    BookingModule,
    ShowModule,
    AuthModule,
  ],
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
