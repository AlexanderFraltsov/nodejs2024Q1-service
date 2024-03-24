import 'dotenv/config';
import { DataSource } from 'typeorm';
import configuration from './config/configuration';
import { UserEntity } from './modules/user/user.entity';

export default new DataSource({
  ...configuration().db,
  type: 'postgres',
  entities: [UserEntity],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  synchronize: false,
});
