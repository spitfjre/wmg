import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Post } from '@wmg/post';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'wmg-post',
	styleUrls: ['./post.component.scss'],
	templateUrl: './post.component.html',
})
export class PostComponent {
	@Input() post: Post;
}
