import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateAlbumDto, IAlbum, UpdateAlbumDto } from 'src/model';
import { AlbumRepository } from '../database/repositories/album.repository';
import { AlbumEntity } from '../database/entities/album.entity';

@Injectable()
export class AlbumService {
  constructor(private readonly albumRepository: AlbumRepository) {}

  async getAll(): Promise<IAlbum[]> {
    const albums = this.albumRepository.findAll();
    return albums.map(this.buildResponse);
  }

  async getOneById(id: string): Promise<IAlbum> {
    const album = this.albumRepository.findOneBy('id', id);
    if (!album) {
      throw new NotFoundException("Album doesn't exist!");
    }
    return this.buildResponse(album);
  }

  async add(dto: CreateAlbumDto): Promise<IAlbum> {
    const album = this.albumRepository.create(dto);
    return this.buildResponse(album);
  }

  async update(id: string, dto: UpdateAlbumDto): Promise<IAlbum> {
    const album = this.albumRepository.findOneBy('id', id);
    if (!album) {
      throw new NotFoundException("Album doesn't exist!");
    }
    const updatedAlbum = this.albumRepository.update(id, dto);
    return this.buildResponse(updatedAlbum);
  }

  async delete(id: string) {
    await this.getOneById(id);
    this.albumRepository.delete(id);
  }

  private buildResponse(entity: AlbumEntity): IAlbum {
    return { ...entity };
  }
}
