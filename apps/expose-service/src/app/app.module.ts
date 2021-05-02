import { Module } from '@nestjs/common';
import { PostGrpcClientService } from './post-grpc-client.service';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PubSub } from 'apollo-server-express';
import { Providers } from './providers.enum';
import { PostsResolver } from './posts.resolver';
import * as Process from 'process';

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
