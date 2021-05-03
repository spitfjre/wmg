import { Injectable } from '@nestjs/common';
import { Post } from '@wmg/post';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable()
export class PostService {
	private postSubject$: Subject<Post> = new Subject<Post>();
	private idSubject$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

	addPost(data: { description?: string; subTitle?: string; title: string }): Post {
		const id: number = this.getNextId();
		const post: Post = { ...data, id };

		this.postSubject$.next(post);
		return post;
	}

	getAddedPosts(): Observable<Post> {
		return this.postSubject$.asObservable();
	}

	private getNextId(): number {
		const currentId: number = this.idSubject$.getValue();

		this.idSubject$.next(currentId + 1);

		return currentId;
	}
}
