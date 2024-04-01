import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({ type: 'string', format: 'uuid', description: 'User ID' })
  id: string;
  @ApiProperty({ type: 'string', description: 'User login' })
  login: string;
  @ApiProperty({ type: 'number', description: 'User entity version' })
  version: number;
  @ApiProperty({ type: 'number', description: 'Timestamp of creation' })
  createdAt: number;
  @ApiProperty({ type: 'number', description: 'Timestamp of last update' })
  updatedAt: number;
}
