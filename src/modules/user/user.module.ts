import { Module } from '@nestjs/common';
import { DataBaseModule } from '../database/database.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
	imports: [DataBaseModule],
	providers: [UserService],
	controllers: [UserController],
})
export class UserModule {}
