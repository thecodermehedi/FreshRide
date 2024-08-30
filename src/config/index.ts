import {z} from 'zod';

type TConfig = {
  port: number;
  nodeEnv: 'development' | 'production';
  dbUri: string;
  dbHost: string;
  dbName: string;
  dbUser?: string;
  dbPass?: string;
  bcryptSaltRounds: number;
  jwtAccessSecret: string;
  jwtAccessExpiresIn: string;
  jwtRefreshSecret: string;
  jwtRefreshExpiresIn: string;
};

const configValidation = z.object({
  port: z.number().default(5000),
  nodeEnv: z.enum(['development', 'production']).default('development'),
  dbUri: z.string().default('mongodb://<hostname>:27017/<database>'),
  dbHost: z.string(),
  dbName: z.string(),
  dbUser: z.string().optional(),
  dbPass: z.string().optional(),
  bcryptSaltRounds: z.number().default(12),
  jwtAccessSecret: z.string(),
  jwtAccessExpiresIn: z.string().default('15m'),
  jwtRefreshSecret: z.string(),
  jwtRefreshExpiresIn: z.string().default('7d'),
});

const rawConfig = {
  ...(process?.env.APP_PORT?.trim() && {port: Number(process?.env.APP_PORT)}),
  ...(process?.env.APP_ENV?.trim() && {nodeEnv: process?.env.APP_ENV}),
  ...(process?.env.DB_URI?.trim() && {dbUri: process?.env.DB_URI}),
  ...(process?.env.DB_HOST?.trim() && {dbHost: process?.env.DB_HOST}),
  ...(process?.env.DB_NAME?.trim() && {dbName: process?.env.DB_NAME}),
  ...(process?.env.DB_USER?.trim() && {dbUser: process?.env.DB_USER}),
  ...(process?.env.DB_PASS?.trim() && {dbPass: process?.env.DB_PASS}),
  ...(process?.env.BCRYPT_SALT_ROUNDS?.trim() && {
    bcryptSaltRounds: Number(process?.env.BCRYPT_SALT_ROUNDS),
  }),
  ...(process?.env.JWT_ACCESS_SECRET?.trim() && {
    jwtAccessSecret: process?.env.JWT_ACCESS_SECRET,
  }),
  ...(process?.env.JWT_ACCESS_EXPIRES_IN?.trim() && {
    jwtAccessExpiresIn: process?.env.JWT_ACCESS_EXPIRES_IN,
  }),
  ...(process?.env.JWT_REFRESH_SECRET?.trim() && {
    jwtRefreshSecret: process?.env.JWT_REFRESH_SECRET,
  }),
  ...(process?.env.JWT_REFRESH_EXPIRES_IN?.trim() && {
    jwtRefreshExpiresIn: process?.env.JWT_REFRESH_EXPIRES_IN,
  }),
};

const config: TConfig = configValidation.parse(rawConfig);

export default config;
