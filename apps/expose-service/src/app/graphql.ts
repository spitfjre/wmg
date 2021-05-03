/*
 * ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface NewPostInput {
	description?: string;
	subTitle?: string;
	title: string;
}

export interface IMutation {
	addPost(newPostData: NewPostInput): Post | Promise<Post>;
}

export interface Post {
	description?: string;
	id: number;
	subTitle?: string;
	title: string;
}

export interface IQuery {
	helloWorld(): string | Promise<string>;
}

export interface ISubscription {
	postAdded(): Post | Promise<Post>;
}
