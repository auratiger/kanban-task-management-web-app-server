import type { Config } from './config.interface';

const config: Config = {
   nest: {
      port: parseInt(process.env.PORT as string, 10) || 3000,
   },
   cors: {
      enabled: true,
   },
   swagger: {
      enabled: true,
      title: 'Nestjs FTW',
      description: 'The nestjs API description',
      version: '1.5',
      path: 'api',
   },
   graphql: {
      playgroundEnabled: true,
      schemaDestination: './src/schema.graphql',
      sortSchema: true,
   },
   security: {
      expiresIn: '20m',
      refreshIn: '7d',
      bcryptSaltOrRound: 10,
   },
};

export default (): Config => config;
