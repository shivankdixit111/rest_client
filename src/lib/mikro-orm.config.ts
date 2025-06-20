import { RequestHistory } from '@/entities/RequestHistory';
import { defineConfig } from '@mikro-orm/postgresql';
import 'dotenv/config';

export default defineConfig({
  clientUrl: process.env.DATABASE_URL,
  entities: [RequestHistory],
  migrations: {
    tableName: 'mikro_orm_migrations',
    path: './src/migrations',
    pathTs: './src/migrations',
  },
  driverOptions: {
    connection: { 
      ssl: { rejectUnauthorized: false }
    }
  },
  debug: process.env.NODE_ENV !== 'production',
});