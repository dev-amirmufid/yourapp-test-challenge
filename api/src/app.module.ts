import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RouterModule } from '@nestjs/core';
import { ApiModule } from './api.module';
import { IsUniqueConstraint } from '@Utils/unique.validator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      database: process.env.DB_NAME,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      synchronize: false,
      entities: [join(__dirname, '**/**.entity{.ts,.js}')],
    }),
    ApiModule,
    RouterModule.register([
      {
        path: 'api',
        module: ApiModule,
      },
    ]),
  ],
  providers: [IsUniqueConstraint],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
