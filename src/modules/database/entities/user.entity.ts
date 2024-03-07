import { v4 } from 'uuid';

import { IUser, CreateUserDto, UpdateUserDto } from 'src/model';

export class UserEntity implements IUser {
	constructor(dto: CreateUserDto) {
		this.create(dto);
	}

  id: string;

  login: string;

  password: string;

  version: number;

  createdAt: number;

  updatedAt: number;

	create({ login, password }: CreateUserDto) {
		this.id = v4();
		this.login = login;
		this.password = password;
		this.version = 1;
		this.createdAt = Date.now();
		this.updatedAt = this.createdAt;
		return this;
	};

	update({ newPassword }: UpdateUserDto) {
		this.password = newPassword;
		this.version += 1;
		this.updatedAt = Date.now();
		return this;
	};
}
