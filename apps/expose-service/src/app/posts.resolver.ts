import { Inject, OnModuleInit } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';

import { NewPostInput, Post } from './graphql';
import { PostGrpcClientService } from './post-grpc-client.service';
import { Providers } from './providers.enum';

const TRIGGER_NAME = 'postAdded';

@Resolver('Post')
export class PostsResolver implements OnModuleInit {
	constructor(
		private postGrpcClientService: PostGrpcClientService,
		@Inject(Providers.PUB_SUB) private pubSub: PubSub,
	) {}

	onModuleInit(): void {
		this.postGrpcClientService
			.getAddedPosts()
			.subscribe((addedPost: Post) => this.pubSub.publish(TRIGGER_NAME, { [TRIGGER_NAME]: addedPost }).then());
	}

	@Query(() => String)
	helloWorld(): string {
		return 'Hello World!';
	}

	@Mutation()
	addPost(@Args('newPostData') newPostData: NewPostInput): Promise<Post> {
		return this.postGrpcClientService.addPost(newPostData);
	}

	@Subscription()
	postAdded(): AsyncIterator<Post> {
		return this.pubSub.asyncIterator(TRIGGER_NAME);
	}
}
