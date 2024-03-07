import { v4 } from 'uuid';

import { CreateArtistDto, IArtist, UpdateArtistDto } from 'src/model';

export class ArtistEntity implements IArtist {
	constructor(dto: CreateArtistDto) {
		this.create(dto);
	}

  id: string;

  name: string;

  grammy: boolean;

	create({ name, grammy }: CreateArtistDto) {
		this.id = v4();
		this.name = name;
		this.grammy = grammy;

		return this;
	};

	update({ name, grammy }: UpdateArtistDto) {
		if (name) {
			this.name = name;
		}
		if (grammy !== undefined && grammy !== null) {
			this.grammy = grammy;
		}
		return this;
	};
}
