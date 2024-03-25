import {
  Injectable,
  NotFoundException,
  OnModuleInit,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { In, Repository } from 'typeorm';

import { FAVORITE_KEY, FavoritesEntity } from './favorites.entity';
import { AlbumEntity } from '../album/album.entity';
import { ArtistEntity } from '../artist/artist.entity';
import { TrackEntity } from '../track/track.entity';

@Injectable()
export class FavoritesService implements OnModuleInit {
  constructor(
    @InjectRepository(FavoritesEntity)
    private readonly favoritesRepository: Repository<FavoritesEntity>,
    @InjectRepository(TrackEntity)
    private readonly trackRepository: Repository<TrackEntity>,
    @InjectRepository(ArtistEntity)
    private readonly artistRepository: Repository<ArtistEntity>,
    @InjectRepository(AlbumEntity)
    private readonly albumRepository: Repository<AlbumEntity>,
  ) {}

  async onModuleInit() {
    const favorites = await this.favoritesRepository.find();
    if (!favorites.length) {
      await this.favoritesRepository.save({ id: FAVORITE_KEY });
    }
  }

  public async getAll() {
    const favorites = await this.favoritesRepository.findOne({
      where: { id: FAVORITE_KEY },
      relations: { albums: true, artists: true, tracks: true },
    });
    return {
      ...favorites,
    };
  }

  public async addAlbum(id: string) {
    const album = await this.albumRepository.findOneBy({ id });
    if (!album) {
      throw new UnprocessableEntityException("Album doesn't exist");
    }
    const { albums } = await this.favoritesRepository.findOne({
      where: { id: FAVORITE_KEY },
      relations: { albums: true },
    });
    if (!albums.some((album) => album.id === id)) {
      await this.favoritesRepository.save({
        id: FAVORITE_KEY,
        albums: [...albums, album],
      });
    }
  }

  public async deleteAlbum(id: string) {
    const { albums } = await this.favoritesRepository.findOne({
      where: { id: FAVORITE_KEY },
      relations: { albums: true },
    });
    if (!albums.some((album) => album.id === id)) {
      throw new NotFoundException('Album is not favorite');
    }

    await this.favoritesRepository.save({
      id: FAVORITE_KEY,
      albums: albums.filter((album) => album.id !== id),
    });
  }

  public async addArtist(id: string) {
    const artist = await this.artistRepository.findOneBy({ id });
    if (!artist) {
      throw new UnprocessableEntityException("Artist doesn't exist");
    }
    const { artists } = await this.favoritesRepository.findOne({
      where: { id: FAVORITE_KEY },
      relations: { artists: true },
    });
    if (!artists.some((artist) => artist.id === id)) {
      await this.favoritesRepository.save({
        id: FAVORITE_KEY,
        artists: [...artists, artist],
      });
    }
  }

  public async deleteArtist(id: string) {
    const { artists } = await this.favoritesRepository.findOne({
      where: { id: FAVORITE_KEY },
      relations: { artists: true },
    });
    if (!artists.some((artist) => artist.id === id)) {
      throw new NotFoundException('Artist is not favorite');
    }

    await this.favoritesRepository.save({
      id: FAVORITE_KEY,
      artists: artists.filter((artist) => artist.id !== id),
    });
  }

  public async addTrack(id: string) {
    const track = await this.trackRepository.findOneBy({ id });
    if (!track) {
      throw new UnprocessableEntityException("Track doesn't exist");
    }
    const { tracks } = await this.favoritesRepository.findOne({
      where: { id: FAVORITE_KEY },
      relations: { tracks: true },
    });
    if (!tracks.some((track) => track.id === id)) {
      await this.favoritesRepository.save({
        id: FAVORITE_KEY,
        tracks: [...tracks, track],
      });
    }
  }

  public async deleteTrack(id: string) {
    const { tracks } = await this.favoritesRepository.findOne({
      where: { id: FAVORITE_KEY },
      relations: { tracks: true },
    });
    if (!tracks.some((track) => track.id === id)) {
      throw new NotFoundException('Track is not favorite');
    }

    await this.favoritesRepository.save({
      id: FAVORITE_KEY,
      tracks: tracks.filter((track) => track.id !== id),
    });
  }
}
