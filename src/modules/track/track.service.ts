import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTrackDto, ITrack, UpdateTrackDto } from 'src/model';
import { TrackEntity } from './track.entity';

@Injectable()
export class TrackService {
  constructor(
		@InjectRepository(TrackEntity)
		private readonly trackRepository: Repository<TrackEntity>) {}

  async getAll(): Promise<ITrack[]> {
    const tracks = await this.trackRepository.find();
    return tracks.map(this.buildResponse);
  }

  async getOneById(id: string): Promise<ITrack> {
    const track = await this.trackRepository.findOneBy({ id });
    if (!track) {
      throw new NotFoundException('Track doesn\'t exist!');
    }
    return this.buildResponse(track);
  }

  async add(dto: CreateTrackDto): Promise<ITrack> {
    const track = await this.trackRepository.save(this.trackRepository.create(dto));
    return this.buildResponse(track);
  }

  async update(id: string, dto: UpdateTrackDto): Promise<ITrack> {
    const track = await this.trackRepository.findOneBy({ id });
    if (!track) {
      throw new NotFoundException("Track doesn't exist!");
    }
		const updatedTrack = Object.assign(track, dto);
    await this.trackRepository.save(updatedTrack);
    return this.buildResponse(updatedTrack);
  }

  async delete(id: string) {
    await this.getOneById(id);
    await this.trackRepository.delete(id);
  }

  private buildResponse(entity: TrackEntity): ITrack {
    return { ...entity };
  }
}
