import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateTrackDto, ITrack, UpdateTrackDto } from 'src/model';
import { TrackRepository } from '../database/repositories/track.repository';
import { TrackEntity } from '../database/entities/track.entity';

@Injectable()
export class TrackService {
  constructor(private readonly trackRepository: TrackRepository) {}

  async getAll(): Promise<ITrack[]> {
    const tracks = this.trackRepository.findAll();
    return tracks.map(this.buildResponse);
  }

  async getOneById(id: string): Promise<ITrack> {
    const track = this.trackRepository.findOneBy('id', id);
    if (!track) {
      throw new NotFoundException("Track doesn't exist!");
    }
    return this.buildResponse(track);
  }

  async add(dto: CreateTrackDto): Promise<ITrack> {
    const track = this.trackRepository.create(dto);
    return this.buildResponse(track);
  }

  async update(id: string, dto: UpdateTrackDto): Promise<ITrack> {
    const track = this.trackRepository.findOneBy('id', id);
    if (!track) {
      throw new NotFoundException("Track doesn't exist!");
    }
    const updatedTrack = this.trackRepository.update(id, dto);
    return this.buildResponse(updatedTrack);
  }

  async delete(id: string) {
    await this.getOneById(id);
    this.trackRepository.delete(id);
  }

  private buildResponse(entity: TrackEntity): ITrack {
    return { ...entity };
  }
}
