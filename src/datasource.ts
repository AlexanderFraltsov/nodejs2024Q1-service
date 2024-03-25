import 'dotenv/config';
import { DataSource } from 'typeorm';

import configuration from './config/configuration';
import { entities } from './entities';

export default new DataSource({
  ...configuration().db,
  type: 'postgres',
  entities,
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  synchronize: false,
});
