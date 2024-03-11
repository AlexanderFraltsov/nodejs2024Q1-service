import {
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';

export class UpdateAlbumDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsNumber()
  @IsOptional()
  year?: number;

  @ValidateIf((dto) => dto.artistId !== null)
  @IsUUID()
  @IsOptional()
  artistId?: string;
}
