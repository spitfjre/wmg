import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Post, POST_SERVICE_NAME, PostGrpcService } from '@wmg/post';
import { Observable } from 'rxjs';

import { Providers } from './providers.enum';

@Injectable()
export class PostGrpcClientService implements OnModuleInit {
	private postGrpcService: PostGrpcService;

	constructor(@Inject(Providers.POST_PACKAGE) private client: ClientGrpc) {}

	onModuleInit(): void {
		this.postGrpcService = this.client.getService<PostGrpcService>(POST_SERVICE_NAME);
	}

	addPost(data: { description?: string; title: string }): Promise<Post> {
		return this.postGrpcService.createPost(data);
	}

	getAddedPosts(): Observable<Post> {
		return this.postGrpcService.getPostAddedSubscription();
	}
}
