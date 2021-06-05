import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
	CREATE_POST_METHOD_NAME,
	CreatePostRequest,
	GET_POST_ADDED_SUBSCRIPTION_METHOD_NAME,
	Post,
	POST_SERVICE_NAME,
} from '@wmg/post';
import { Observable } from 'rxjs';

import { PostService } from './post.service';

@Controller()
export class PostController {
	constructor(private readonly appService: PostService) {}

	@GrpcMethod(POST_SERVICE_NAME, CREATE_POST_METHOD_NAME)
	createPost(data: CreatePostRequest): Post {
		return this.appService.addPost(data);
	}

	@GrpcMethod(POST_SERVICE_NAME, GET_POST_ADDED_SUBSCRIPTION_METHOD_NAME)
	getPostAddedSubscription(): Observable<Post> {
		return this.appService.getAddedPosts();
	}
}
