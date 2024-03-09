import { Injectable } from '@nestjs/common';

import { IFavorites } from 'src/model';

@Injectable()
export class FavoritesRepository {
	table: IFavorites = {
		albums: [],
		artists: [],
		tracks: [],
	};

	addArtist(artistId: string) {
		if (this.table.artists.some(id => artistId === id)) {
			return false;
		}
		this.table.artists.push(artistId);
		return true;
	}

	deleteArtist(artistId: string) {
		if (!this.table.artists.some(id => artistId === id)) {
			return false;
		}
		this.table.artists = this.table.artists.filter(id => artistId !== id);
		return true;
	}

	addAlbum(albumId: string) {
		if (this.table.albums.some(id => albumId === id)) {
			return false;
		}
		this.table.albums.push(albumId);
		return true;
	}

	deleteAlbum(albumId: string) {
		if (!this.table.albums.some(id => albumId === id)) {
			return false;
		}
		this.table.albums = this.table.albums.filter(id => albumId !== id);
		return true;
	}

	addTrack(trackId: string) {
		if (this.table.tracks.some(id => trackId === id)) {
			return false;
		}
		this.table.tracks.push(trackId);
		return true;
	}

	deleteTrack(trackId: string) {
		if (!this.table.tracks.some(id => trackId === id)) {
			return false;
		}
		this.table.tracks = this.table.tracks.filter(id => trackId !== id);
		return true;
	}

	findAll() {
		return this.table;
	}
}
