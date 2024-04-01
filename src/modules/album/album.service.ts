import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CreateAlbumDto, IAlbum, UpdateAlbumDto } from 'src/model';
import { AlbumEntity } from './album.entity';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(AlbumEntity)
    private readonly albumRepository: Repository<AlbumEntity>,
  ) {}

  async getAll(): Promise<IAlbum[]> {
    const albums = await this.albumRepository.find();
    return albums.map(this.buildResponse);
  }

  async getOneById(id: string): Promise<IAlbum> {
    const album = await this.albumRepository.findOneBy({ id });
    if (!album) {
      throw new NotFoundException("Album doesn't exist!");
    }
    return this.buildResponse(album);
  }

  async add(dto: CreateAlbumDto): Promise<IAlbum> {
    const album = await this.albumRepository.save(
      this.albumRepository.create(dto),
    );
    return this.buildResponse(album);
  }

  async update(id: string, dto: UpdateAlbumDto): Promise<IAlbum> {
    const album = await this.albumRepository.findOneBy({ id });
    if (!album) {
      throw new NotFoundException("Album doesn't exist!");
    }
    const updatedAlbum = Object.assign(album, dto);
    await this.albumRepository.save(updatedAlbum);
    return this.buildResponse(updatedAlbum);
  }

  async delete(id: string) {
    await this.getOneById(id);
    await this.albumRepository.delete(id);
  }

  private buildResponse(entity: AlbumEntity): IAlbum {
    return { ...entity };
  }
}
