import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import configuration from './config/configuration';
import { UserModule } from './modules/user/user.module';
import { TrackModule } from './modules/track/track.module';

@Module({
  imports: [
		ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
		UserModule,
		TrackModule,
	],
})
export class AppModule {}
