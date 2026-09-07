import { Logger, Module, OnApplicationShutdown } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

const DB_NAME = 'dudas';
const logger = new Logger('Database');

let memoryServer: MongoMemoryServer | undefined;

async function resolveMongoUri(): Promise<string> {
  if (process.env.MONGODB_URI) {
    return process.env.MONGODB_URI;
  }
  memoryServer = await MongoMemoryServer.create({ instance: { dbName: DB_NAME } });
  logger.log('Mongo en memoria arrancado; los datos se regeneran en cada arranque');
  return memoryServer.getUri();
}

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async () => ({ uri: await resolveMongoUri() }),
    }),
  ],
})
export class DatabaseModule implements OnApplicationShutdown {
  async onApplicationShutdown(): Promise<void> {
    await memoryServer?.stop();
    memoryServer = undefined;
  }
}
