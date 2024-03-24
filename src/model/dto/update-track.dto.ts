import {
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';

export class UpdateTrackDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsNumber()
  @IsOptional()
  duration?: number;

  @ValidateIf((dto) => dto.artistId !== null)
  @IsUUID()
  @IsOptional()
  artistId?: string;

  @ValidateIf((dto) => dto.albumId !== null)
  @IsUUID()
  @IsOptional()
  albumId?: string;
}
