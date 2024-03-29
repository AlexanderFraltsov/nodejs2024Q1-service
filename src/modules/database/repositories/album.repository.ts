import { Injectable } from '@nestjs/common';

import { CreateAlbumDto, UpdateAlbumDto } from 'src/model';
import { AlbumEntity } from '../entities/album.entity';
import { TrackRepository } from './track.repository';
import { FavoritesRepository } from './favorites.repository';

@Injectable()
export class AlbumRepository {
  table: AlbumEntity[] = [];

  constructor(
    private readonly trackRepository: TrackRepository,
    private readonly favoritesRepository: FavoritesRepository,
  ) {}

  create(dto: CreateAlbumDto) {
    const entity = new AlbumEntity(dto);
    this.table.push(entity);
    return entity;
  }

  update(id: string, dto: UpdateAlbumDto) {
    const entity = this.findOneBy('id', id);
    const updatedEntity = entity.update(dto);
    this.table = this.table.map((entity) =>
      entity.id === id ? updatedEntity : entity,
    );
    return updatedEntity;
  }

  delete(id: string) {
    this.favoritesRepository.deleteAlbum(id);
    const tracks = this.trackRepository.findManyBy('albumId', id);
    tracks.forEach(({ id }) =>
      this.trackRepository.update(id, {
        albumId: null,
      }),
    );

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
