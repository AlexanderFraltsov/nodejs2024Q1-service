import { Injectable } from '@nestjs/common';

import { CreateTrackDto, UpdateTrackDto } from 'src/model';
import { TrackEntity } from '../entities/track.entity';
import { FavoritesRepository } from './favorites.repository';


@Injectable()
export class TrackRepository {
	table: TrackEntity[];

	constructor(
		private readonly favoritesRepository: FavoritesRepository,
	) {}

	create(dto: CreateTrackDto) {
		const entity = new TrackEntity(dto);
		this.table.push(entity);
		return entity;
	}

	update(id: string, dto: UpdateTrackDto) {
		const entity = this.findOneBy('id', id);
		if (!entity) {
			throw new Error('Entity is not exist');
		}
		const updatedEntity = entity.update(dto);
		this.table = this.table.map(entity => entity.id === id ? updatedEntity : entity);
		return updatedEntity;
	}

	delete(id: string) {
		const entity = this.findOneBy('id', id);
		if (!entity) {
			throw new Error('Entity is not exist');
		}
		this.favoritesRepository.deleteTrack(id);
		this.table = this.table.filter(entity => entity.id !== id);
		return true;
	}

	findOneBy<T>(param: string, value: T) {
		return this.table.find(entity => entity[param] === value);
	}

	findManyBy<T>(param: string, value: T) {
		return this.table.filter(entity => entity[param] === value);
	}

	findAll() {
		return this.table;
	}
}
