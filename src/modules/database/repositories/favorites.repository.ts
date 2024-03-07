import { Injectable } from '@nestjs/common';

import { IFavorites } from 'src/model';

@Injectable()
export class FavoritesRepository {
	table: IFavorites;

	addArtist(artistId: string) {
		if (this.table.artists.some(id => artistId === id)) {
			throw new Error('Artist is already added');
		}
		this.table.artists.push(artistId);
	}

	deleteArtist(artistId: string) {
		if (!this.table.artists.some(id => artistId === id)) {
			throw new Error('Artist is not in favorites');
		}
		this.table.artists = this.table.artists.filter(id => artistId !== id);
		return true;
	}

	addAlbum(albumId: string) {
		if (this.table.albums.some(id => albumId === id)) {
			throw new Error('Album is already added');
		}
		this.table.albums.push(albumId);
	}

	deleteAlbum(albumId: string) {
		if (!this.table.albums.some(id => albumId === id)) {
			throw new Error('Album is not in favorites');
		}
		this.table.albums = this.table.albums.filter(id => albumId !== id);
		return true;
	}

	addTrack(trackId: string) {
		if (this.table.tracks.some(id => trackId === id)) {
			throw new Error('Track is already added');
		}
		this.table.tracks.push(trackId);
	}

	deleteTrack(trackId: string) {
		if (!this.table.tracks.some(id => trackId === id)) {
			throw new Error('Track is not in favorites');
		}
		this.table.tracks = this.table.tracks.filter(id => trackId !== id);
		return true;
	}

	findAll() {
		return this.table;
	}
}
