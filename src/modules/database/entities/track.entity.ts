import { v4 } from 'uuid';

import { CreateTrackDto, ITrack, UpdateTrackDto } from 'src/model';

export class TrackEntity implements ITrack {
	constructor(dto: CreateTrackDto) {
		this.create(dto);
	}

  id: string;

  name: string;

  duration: number;

	artistId: string | null = null;

	albumId: string | null = null;

	create({ name, albumId, artistId, duration }: CreateTrackDto) {
		this.id = v4();
		this.name = name;
		this.duration = duration;
		if (artistId) {
			this.artistId = artistId;
		}
		if (albumId) {
			this.albumId = albumId;
		}

		return this;
	};

	update({ name, albumId, artistId, duration }: UpdateTrackDto) {
		if (name) {
			this.name = name;
		}
		if (duration) {
			this.duration = duration;
		}
		if (artistId !== undefined) {
			this.artistId = artistId;
		}
		if (albumId !== undefined) {
			this.albumId = albumId;
		}
		return this;
	};
}
