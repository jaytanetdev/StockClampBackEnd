import { registerAs } from '@nestjs/config';

export type TAppConfig = {
  port: number;
  domainBackend?: string;
};
export default registerAs(
  'app',
  (): TAppConfig => ({
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 5000,
    domainBackend: process.env.DOMAIN_BACKEND,
  }),
);
