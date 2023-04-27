import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'nestjs-prisma';
import { loggingMiddleware } from './common/middleware/logging.middleware';
import { AppController } from './app/app.controller';
import { AppService } from './app/app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import config from './common/config/config';
import { GqlConfigService } from './gql-config.service';
import { HealthModule } from './modules/health/health.module';
import { BoardModule } from './modules/board/board.module';
import { ColumnModule } from './modules/column/column.module';
import { PrismaModuleTest } from './prisma.module';

@Module({
   imports: [
      ConfigModule.forRoot({
         envFilePath: ['.env.dev', '.env', '.env.sample'],
         isGlobal: true,
         load: [config],
      }),
      PrismaModule.forRoot({
         isGlobal: true,
         prismaServiceOptions: {
            middlewares: [loggingMiddleware(new Logger('PrismaMiddleware'))], // configure your prisma middleware
         },
      }),
      GraphQLModule.forRootAsync<ApolloDriverConfig>({
         driver: ApolloDriver,
         useClass: GqlConfigService,
      }),
      BoardModule,
      ColumnModule,
      HealthModule,
      PrismaModuleTest,
   ],
   controllers: [AppController],
   providers: [AppService],
})
export class AppModule {}
