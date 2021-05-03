import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Post, PostService } from '@wmg/post';
import { Observable } from 'rxjs';

import { Providers } from './providers.enum';

@Injectable()
export class PostGrpcClientService implements OnModuleInit {
	private postService: PostService;

	constructor(@Inject(Providers.POST_PACKAGE) private client: ClientGrpc) {}

	onModuleInit(): void {
		this.postService = this.client.getService<PostService>('PostService');
	}

	addPost(data: { description?: string; title: string }): Promise<Post> {
		return this.postService.createPost(data);
	}

	getAddedPosts(): Observable<Post> {
		return this.postService.getPostAddedSubscription();
	}
}
