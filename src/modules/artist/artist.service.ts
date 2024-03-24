import { Injectable, NotFoundException } from '@nestjs/common';

import { ArtistRepository } from '../database/repositories/artist.repository';
import { CreateArtistDto, IArtist, UpdateArtistDto } from 'src/model';
import { ArtistEntity } from '../database/entities/artist.entity';

@Injectable()
export class ArtistService {
  constructor(private readonly artistRepository: ArtistRepository) {}

  async getAll(): Promise<IArtist[]> {
    const artists = this.artistRepository.findAll();
    return artists.map(this.buildResponse);
  }

  async getOneById(id: string): Promise<IArtist> {
    const artist = this.artistRepository.findOneBy('id', id);
    if (!artist) {
      throw new NotFoundException("Artist doesn't exist!");
    }
    return this.buildResponse(artist);
  }

  async add(dto: CreateArtistDto): Promise<IArtist> {
    const artist = this.artistRepository.create(dto);
    return this.buildResponse(artist);
  }

  async update(id: string, dto: UpdateArtistDto): Promise<IArtist> {
    const artist = this.artistRepository.findOneBy('id', id);
    if (!artist) {
      throw new NotFoundException("Artist doesn't exist!");
    }
    const updatedArtist = this.artistRepository.update(id, dto);
    return this.buildResponse(updatedArtist);
  }

  async delete(id: string) {
    await this.getOneById(id);
    this.artistRepository.delete(id);
  }

  private buildResponse(entity: ArtistEntity): IArtist {
    return { ...entity };
  }
}
