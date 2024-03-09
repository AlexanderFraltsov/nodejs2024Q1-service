import { v4 } from 'uuid';

import { CreateAlbumDto, IAlbum, UpdateAlbumDto } from 'src/model';

export class AlbumEntity implements IAlbum {
	constructor(dto: CreateAlbumDto) {
		this.create(dto);
	}

  id: string;

  name: string;

  year: number;

	artistId: string | null = null;

	create({ name, year, artistId }: CreateAlbumDto) {
		this.id = v4();
		this.name = name;
		this.year = year;
		if (artistId) {
			this.artistId = artistId;
		}

		return this;
	};

	update({ name, year, artistId }: UpdateAlbumDto) {
		if (name) {
			this.name = name;
		}
		if (year) {
			this.year = year;
		}
		if (artistId) {
			this.artistId = artistId;
		}
		return this;
	};
}
