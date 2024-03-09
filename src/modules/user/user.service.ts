import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';

import { CreateUserDto, IUser, UpdateUserDto } from 'src/model';
import { UserRepository } from '../database/repositories/user.repository';
import { UserEntity } from '../database/entities/user.entity';

@Injectable()
export class UserService {
	constructor(private readonly userRepository: UserRepository) {}

	async getAll(): Promise<IUser[]> {
		const users = this.userRepository.findAll();
		return users.map(this.buildResponse);
	}

	async getOneById(id: string): Promise<IUser> {
		const user = this.userRepository.findOneBy('id', id);
		if (!user) {
			throw new NotFoundException('User doesn\'t exist!');
		}
		return this.buildResponse(user);
	}

	async add(dto: CreateUserDto): Promise<IUser> {
		const user = this.userRepository.create(dto);
		return this.buildResponse(user);
	}

	async changePassword(id: string, dto: UpdateUserDto): Promise<IUser> {
		const user = this.userRepository.findOneBy('id', id);
		if (!user) {
			throw new NotFoundException('User doesn\'t exist!');
		}
		if (user.password !== dto.oldPassword) {
			throw new ForbiddenException('Password doesn\'t match!');
		}
		const updatedUser = this.userRepository.update(id, dto);
		return this.buildResponse(updatedUser);
	}

	async delete(id: string) {
		await this.getOneById(id);
		this.userRepository.delete(id);
	}

	private buildResponse(entity: UserEntity): IUser {
		const user = {...entity};
		delete user.password;
		return user;
	}
}
