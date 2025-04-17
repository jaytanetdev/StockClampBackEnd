import { registerAs } from '@nestjs/config';

export type DbConfig = {
  url?: string;
  user?: string;
  pass?: string;
  dbName?: string;
};

export default registerAs(
  'db',
  (): DbConfig => ({
    url: process.env.MONGO_URL,
    user: process.env.MONGO_USER,
    pass: process.env.MONGO_PASSWORD,
    dbName: process.env.MONGO_NAME,
  }),
);
