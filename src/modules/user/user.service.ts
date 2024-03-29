import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { compareWithHashed, createHash } from 'src/utils';
import { CreateUserDto, IUser, UpdateUserDto } from 'src/model';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly configService: ConfigService,
  ) {}

  async getAll(): Promise<IUser[]> {
    const users = await this.userRepository.find();
    return users.map(this.buildResponse);
  }

  async getOneById(id: string): Promise<IUser> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException("User doesn't exist!");
    }
    return this.buildResponse(user);
  }

  async getOneByLogin(login: string) {
    const user = await this.userRepository.findOneBy({ login });
    if (!user) {
      throw new NotFoundException("User doesn't exist!");
    }
    return { ...user };
  }

  async add(dto: CreateUserDto): Promise<IUser> {
    const password = await createHash(
      dto.password,
      this.configService.get('cryptSalt'),
    );
    const user = await this.userRepository.save(
      this.userRepository.create({ ...dto, password }),
    );
    return this.buildResponse(user);
  }

  async changePassword(id: string, dto: UpdateUserDto): Promise<IUser> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException("User doesn't exist!");
    }
    const isPasswordMatch = await compareWithHashed(
      dto.oldPassword,
      user.password,
    );
    if (!isPasswordMatch) {
      throw new ForbiddenException("Password doesn't match!");
    }
    const password = await createHash(
      dto.newPassword,
      this.configService.get('cryptSalt'),
    );

    await this.userRepository.save(Object.assign(user, { password }));
    return this.buildResponse(user);
  }

  async delete(id: string) {
    await this.getOneById(id);
    await this.userRepository.delete(id);
  }

  private buildResponse(entity: UserEntity): IUser {
    const user: IUser = {
      ...entity,
      createdAt: entity.createdAt.getTime(),
      updatedAt: entity.updatedAt.getTime(),
    };
    delete user.password;
    return user;
  }
}
