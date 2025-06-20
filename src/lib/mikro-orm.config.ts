import { RequestHistory } from '@/entities/RequestHistory';
import { PostgreSqlDriver } from '@mikro-orm/postgresql'; // Import the driver
import { Options } from '@mikro-orm/core';
import { parse } from 'pg-connection-string';

const neonConfig = parse(process.env.DATABASE_URL!);

export default {
  driver: PostgreSqlDriver, // Explicit driver specification
  dbName: neonConfig.database || 'neondb',
  user: neonConfig.user || 'neondb_owner',
  password: neonConfig.password,
  host: neonConfig.host || 'ep-proud-glade-a9pq1z9v-pooler.gwc.azure.neon.tech',
  port: neonConfig.port ? parseInt(neonConfig.port) : 5432,
  entities: [RequestHistory],
  entitiesTs: ['./src/entities/**/*.ts'],
  migrations: {
    path: './dist/migrations',
    pathTs: './src/migrations',
    disableForeignKeys: false,
  },
  pool: { min: 1, max: 1 },
  driverOptions: {
    connection: { 
      ssl: { 
        require: true,
        rejectUnauthorized: false
      }
    }
  },
  allowGlobalContext: true,
  debug: process.env.NODE_ENV === 'development',
} satisfies Options<PostgreSqlDriver>; // Type with driver