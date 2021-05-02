import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class NewPostData {
	@Field()
	title: string;

	@Field()
	description?: string;
}
