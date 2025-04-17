

import { registerAs } from '@nestjs/config';

export type GoogleConfig = {
  googleClientId?: string;
  googleClientSecret?: string;
  backEndURL?:string
};

export default registerAs(
  'google',
  (): GoogleConfig => ({
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    backEndURL:process.env.DOMAIN_BACKEND
  }),
);
