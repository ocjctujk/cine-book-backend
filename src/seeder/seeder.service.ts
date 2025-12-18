// src/seeder/seeder.service.ts
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Genre } from '../genre/genre.entity';
import { Language } from '../language/language.entity';
import { Format } from '../format/format.entity';

@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(Genre)
    private readonly genreRepo: Repository<Genre>,
    @InjectRepository(Language)
    private readonly languageRepo: Repository<Language>,
    @InjectRepository(Format)
    private readonly formatRepo: Repository<Format>,
  ) {}

  async seed() {
    console.log('🌱 Starting database seeding...');

    // Example: Seed genres
    const existingGenres = await this.genreRepo.find();
    if (existingGenres.length === 0) {
      await this.genreRepo.save([
        { name: 'Action' },
        { name: 'Drama' },
        { name: 'Comedy' },
      ]);
    }
    const existingLanguages = await this.languageRepo.find();
    if (existingLanguages.length === 0) {
      await this.languageRepo.save([
        { name: 'English' },
        { name: 'Hindi' },
        { name: 'Kanadda' },
      ]);
    }
    const existingFormats = await this.formatRepo.find();
    if (existingFormats.length === 0) {
      await this.formatRepo.save([
        { name: '3D' },
        { name: '2D' },
        { name: 'IMax' },
      ]);
    }

    console.log('✅ Seeding complete!');
  }
}
