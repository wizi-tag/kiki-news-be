import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASS'),
        host: configService.get('DB_HOST'),
        database: configService.get('DB_NAME'),
        port: configService.get('DB_PORT'),
        dialect: configService.get('DB_DIALECT'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
