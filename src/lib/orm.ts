import { MikroORM } from '@mikro-orm/core';
import config from './mikro-orm.config';

let orm: MikroORM;

export async function getOrm() {
  if (!orm) {
    orm = await MikroORM.init(config);
    const migrator = orm.getMigrator();
    await migrator.up();
  }
  return orm;
}