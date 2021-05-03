import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PubSub } from 'apollo-server-express';
import { join } from 'path';
import * as Process from 'process';

import { PostGrpcClientService } from './post-grpc-client.service';
import { PostsResolver } from './posts.resolver';
import { Providers } from './providers.enum';

@Module({
	imports: [
		ClientsModule.register([
			{
				name: Providers.POST_PACKAGE,
				transport: Transport.GRPC,
				options: {
					package: 'post',
					protoPath: 'assets/schema.proto',
				},
			},
		]),
		GraphQLModule.forRoot({
			cors: {
				origin: true,
				credentials: true,
			},
			definitions: {
				path: join(Process.cwd(), './apps/expose-service/src/app/graphql.ts'),
			},
			installSubscriptionHandlers: true,
			sortSchema: true,
			subscriptions: {
				keepAlive: 5000,
			},
			typePaths: ['../**/*.gql'],
		}),
	],
	providers: [
		PostGrpcClientService,
		PostsResolver,
		{
			provide: Providers.PUB_SUB,
			useValue: new PubSub(),
		},
	],
})
export class AppModule {}
