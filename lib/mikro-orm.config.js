"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RequestHistory_1 = require("@/entities/RequestHistory");
var postgresql_1 = require("@mikro-orm/postgresql");
var migrations_1 = require("@mikro-orm/migrations");
require("dotenv/config");
var config = {
    // Required settings
    driver: postgresql_1.PostgreSqlDriver, // Explicit driver specification
    clientUrl: process.env.DATABASE_URL,
    entities: [RequestHistory_1.RequestHistory],
    extensions: [migrations_1.Migrator], // Crucial for migrations
    // Migration configuration
    migrations: {
        tableName: 'mikro_orm_migrations', // Table to track migrations
        path: 'src/migrations', // Where to store migration files
        pathTs: 'src/migrations', // TS migration files
        glob: '!(*.d).{js,ts}', // Pattern to match migration files
    },
    // Neon-specific settings
    driverOptions: {
        connection: {
            ssl: true // Required for Neon
        }
    },
    // Development settings
    debug: true,
    tsNode: process.env.NODE_ENV === 'development',
    entitiesTs: ['src/entities'], // Path to TS entities
};
exports.default = config;
