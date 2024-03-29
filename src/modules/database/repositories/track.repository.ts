import { Injectable } from '@nestjs/common';

import { CreateTrackDto, UpdateTrackDto } from 'src/model';
import { TrackEntity } from '../entities/track.entity';
import { FavoritesRepository } from './favorites.repository';

@Injectable()
export class TrackRepository {
  table: TrackEntity[] = [];

  constructor(private readonly favoritesRepository: FavoritesRepository) {}

  create(dto: CreateTrackDto) {
    const entity = new TrackEntity(dto);
    this.table.push(entity);
    return entity;
  }

  update(id: string, dto: UpdateTrackDto) {
    const entity = this.findOneBy('id', id);
    const updatedEntity = entity.update(dto);
    this.table = this.table.map((entity) =>
      entity.id === id ? updatedEntity : entity,
    );
    return updatedEntity;
  }

  delete(id: string) {
    this.favoritesRepository.deleteTrack(id);
    this.table = this.table.filter((entity) => entity.id !== id);
    return true;
  }

  findOneBy<T>(param: string, value: T) {
    return this.table.find((entity) => entity[param] === value);
  }

  findManyBy<T>(param: string, value: T) {
    return this.table.filter((entity) => entity[param] === value);
  }

  findManyByIds(ids: string[]) {
    return this.table.filter(({ id }) => ids.includes(id));
  }

  findAll() {
    return this.table;
  }
}
