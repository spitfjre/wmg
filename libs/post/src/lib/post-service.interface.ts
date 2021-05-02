import { CreatePostRequest } from './create-post-request.interface';
import { Post } from './post.interface';
import { Observable } from 'rxjs';

export interface PostService {
	createPost(data: CreatePostRequest): Promise<Post>;
	getPostAddedSubscription(): Observable<Post>;
}
