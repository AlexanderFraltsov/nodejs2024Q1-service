import { Injectable } from '@nestjs/common';

import { CreateArtistDto, UpdateArtistDto } from 'src/model';
import { ArtistEntity } from '../entities/artist.entity';

@Injectable()
export class ArtistRepository {
	table: ArtistEntity[];

	create(dto: CreateArtistDto) {
		const entity = new ArtistEntity(dto);
		this.table.push(entity);
		return entity;
	}

	update(id: string, dto: UpdateArtistDto) {
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
		this.table = this.table.filter(entity => entity.id !== id);
		return true;
	}

	findOneBy<T>(param: string, value: T) {
		return this.table.find(entity => entity[param] === value);
	}

	findAll() {
		return this.table;
	}
}
