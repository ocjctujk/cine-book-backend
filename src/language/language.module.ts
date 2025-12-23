import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Language } from './language.entity';
import { LanguageService } from './language.service';
import { LanguageController } from './language.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Language])],
  exports: [TypeOrmModule],
  providers: [LanguageService],
  controllers: [LanguageController],
})
export class LanguageModule {}
