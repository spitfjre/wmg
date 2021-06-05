import { Observable } from 'rxjs';

import { CreatePostRequest } from './create-post-request.interface';
import { Post } from './post.interface';

export const POST_SERVICE_NAME = 'PostService';

export const CREATE_POST_METHOD_NAME = "CreatePost";
export const GET_POST_ADDED_SUBSCRIPTION_METHOD_NAME = "GetPostAddedSubscription";

export interface PostGrpcService {
	createPost(data: CreatePostRequest): Promise<Post>;

	getPostAddedSubscription(): Observable<Post>;
}
