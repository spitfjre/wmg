import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './app/app.module';

async function bootstrap() {
	const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
		options: { package: 'post', protoPath: 'assets/schema.proto' },
		transport: Transport.GRPC,
	});

	app.listen(() => console.log('SourceService is listening'));
}

bootstrap();
