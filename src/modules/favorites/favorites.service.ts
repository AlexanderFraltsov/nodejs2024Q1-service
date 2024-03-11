import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FavoritesRepository } from '../database/repositories/favorites.repository';
import { TrackRepository } from '../database/repositories/track.repository';
import { ArtistRepository } from '../database/repositories/artist.repository';
import { AlbumRepository } from '../database/repositories/album.repository';

@Injectable()
export class FavoritesService {
  constructor(
    private readonly favoritesRepository: FavoritesRepository,
    private readonly trackRepository: TrackRepository,
    private readonly artistRepository: ArtistRepository,
    private readonly albumRepository: AlbumRepository,
  ) {}

  public getAll() {
    const { albums, artists, tracks } = this.favoritesRepository.findAll();
    return {
      albums: this.albumRepository.findManyByIds(albums),
      artists: this.artistRepository.findManyByIds(artists),
      tracks: this.trackRepository.findManyByIds(tracks),
    };
  }

  public addAlbum(id: string) {
    const album = this.albumRepository.findOneBy('id', id);
    if (!album) {
      throw new UnprocessableEntityException("Album doesn't exist");
    }
    this.favoritesRepository.addAlbum(id);
  }

  public deleteAlbum(id: string) {
    const isDeleted = this.favoritesRepository.deleteAlbum(id);
    if (!isDeleted) {
      throw new NotFoundException('Album is not favorite');
    }
  }

  public addArtist(id: string) {
    const artist = this.artistRepository.findOneBy('id', id);
    if (!artist) {
      throw new UnprocessableEntityException("Artist doesn't exist");
    }
    this.favoritesRepository.addArtist(id);
  }

  public deleteArtist(id: string) {
    const isDeleted = this.favoritesRepository.deleteArtist(id);
    if (!isDeleted) {
      throw new NotFoundException('Artist is not favorite');
    }
  }

  public addTrack(id: string) {
    const track = this.trackRepository.findOneBy('id', id);
    if (!track) {
      throw new UnprocessableEntityException("Track doesn't exist");
    }
    this.favoritesRepository.addTrack(id);
  }

  public deleteTrack(id: string) {
    const isDeleted = this.favoritesRepository.deleteTrack(id);
    if (!isDeleted) {
      throw new NotFoundException('Track is not favorite');
    }
  }
}
