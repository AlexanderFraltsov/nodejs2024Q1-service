import { Injectable } from '@nestjs/common';

import { CreateUserDto, UpdateUserDto } from 'src/model';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserRepository {
  table: UserEntity[] = [];

  create(dto: CreateUserDto) {
    const entity = new UserEntity(dto);
    this.table.push(entity);
    return entity;
  }

  update(id: string, dto: UpdateUserDto) {
    const entity = this.findOneBy('id', id);
    const updatedEntity = entity.update(dto);
    this.table = this.table.map((entity) =>
      entity.id === id ? updatedEntity : entity,
    );
    return updatedEntity;
  }

  delete(id: string) {
    this.table = this.table.filter((entity) => entity.id !== id);
    return true;
  }

  findOneBy<T>(param: string, value: T) {
    return this.table.find((entity) => entity[param] === value);
  }

  findManyBy<T>(param: string, value: T) {
    return this.table.filter((entity) => entity[param] === value);
  }

  findAll() {
    return this.table;
  }
}
