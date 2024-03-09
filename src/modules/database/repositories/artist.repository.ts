import { Injectable } from '@nestjs/common';

import { CreateArtistDto, UpdateArtistDto } from 'src/model';
import { ArtistEntity } from '../entities/artist.entity';
import { AlbumRepository } from './album.repository';
import { TrackRepository } from './track.repository';
import { FavoritesRepository } from './favorites.repository';

@Injectable()
export class ArtistRepository {
	table: ArtistEntity[] = [];

	constructor(
		private readonly albumRepository: AlbumRepository,
		private readonly trackRepository: TrackRepository,
		private readonly favoritesRepository: FavoritesRepository,
	) {}

	create(dto: CreateArtistDto) {
		const entity = new ArtistEntity(dto);
		this.table.push(entity);
		return entity;
	}

	update(id: string, dto: UpdateArtistDto) {
		const entity = this.findOneBy('id', id);
		const updatedEntity = entity.update(dto);
		this.table = this.table.map(entity => entity.id === id ? updatedEntity : entity);
		return updatedEntity;
	}

	delete(id: string) {
		this.favoritesRepository.deleteArtist(id);
		const albums = this.albumRepository.findManyBy('artistId', id);
		const tracks = this.trackRepository.findManyBy('artistId', id);
		albums.forEach(({ id }) => this.albumRepository.update(id, {
			artistId: null,
		}));
		tracks.forEach(({ id }) => this.trackRepository.update(id, {
			artistId: null,
		}));

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
