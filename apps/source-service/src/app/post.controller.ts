import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CreatePostRequest, Post } from '@wmg/post';
import { Observable } from 'rxjs';

import { PostService } from './post.service';

@Controller()
export class PostController {
	constructor(private readonly appService: PostService) {}

	@GrpcMethod('PostService', 'CreatePost')
	createPost(data: CreatePostRequest): Post {
		return this.appService.addPost(data);
	}

	@GrpcMethod('PostService', 'GetPostAddedSubscription')
	getPostAddedSubscription(): Observable<Post> {
		return this.appService.getAddedPosts();
	}
}
