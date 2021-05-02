import { Injectable } from '@nestjs/common';
import { Observable, Subject } from 'rxjs';
import { Post } from '@wmg/post';

@Injectable()
export class PostService {
	private subject: Subject<Post> = new Subject<Post>();

	addPost(data: { description?: string; title: string }): Post {
		const post: Post = { ...data, id: '#ID' };

		this.subject.next(post);
		return post;
	}

	getAddedPosts(): Observable<Post> {
		return this.subject.asObservable();
	}
}
