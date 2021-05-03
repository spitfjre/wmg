import { Injectable } from '@angular/core';
import { Post } from '@wmg/post';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const ADD_POST_MUTATION = gql`
	mutation AddPost($newPostData: NewPostInput!) {
		addPost(newPostData: $newPostData) {
			title
			subTitle
			description
		}
	}
`;

const ADDED_POSTS_SUBSCRIPTION = gql`
	subscription postAdded {
		postAdded {
			title
			subTitle
			description
		}
	}
`;

@Injectable()
export class PostService {
	constructor(private apollo: Apollo) {}

	addPost(): void {
		this.apollo
			.mutate({
				mutation: ADD_POST_MUTATION,
				variables: {
					newPostData: {
						title: 'Shiba Inu',
						subTitle: 'Dog Breed',
						description:
							'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.',
					},
				},
			})
			.subscribe();
	}

	getAddedPosts(): Observable<Post> {
		return this.apollo
			.subscribe<{ postAdded: Post }>({
				query: ADDED_POSTS_SUBSCRIPTION,
			})
			.pipe(map(result => result.data.postAdded));
	}
}
