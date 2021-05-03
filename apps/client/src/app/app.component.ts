import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from '@wmg/post';
import { BehaviorSubject, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { PostService } from './post.service';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'wmg-root',
	styleUrls: ['./app.component.scss'],
	templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {
	private destroy$: Subject<void> = new Subject<void>();

	public postsSubject$: BehaviorSubject<Set<Post>> = new BehaviorSubject<Set<Post>>(new Set<Post>());

	constructor(private postService: PostService) {}

	ngOnInit(): void {
		this.postService
			.getAddedPosts()
			.pipe(
				takeUntil(this.destroy$),
				filter((post: Post) => !!post),
			)
			.subscribe((post: Post) => this.postsSubject$.next(this.postsSubject$.getValue().add(post)));
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	addPost(): void {
		this.postService.addPost();
	}
}
