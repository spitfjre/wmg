import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InMemoryCache, split } from '@apollo/client/core';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';

import { AppComponent } from './app.component';
import { PostService } from './post.service';
import { PostComponent } from './post/post.component';

@NgModule({
	bootstrap: [AppComponent],
	declarations: [AppComponent, PostComponent],
	imports: [BrowserModule, BrowserAnimationsModule, CommonModule, HttpClientModule, MatButtonModule, MatCardModule],
	providers: [
		PostService,
		{
			deps: [HttpLink],
			provide: APOLLO_OPTIONS,
			useFactory(httpLink: HttpLink) {
				// Create an http link:
				const http = httpLink.create({ uri: 'http://localhost:3333/graphql' });
				// Create a WebSocket link:
				const ws = new WebSocketLink({ options: { reconnect: true }, uri: `ws://localhost:3333/graphql` });
				// using the ability to split links, you can send data to each link
				// depending on what kind of operation is being sent
				const link = split(
					// split based on operation type
					({ query }) => {
						const mainDefinition = getMainDefinition(query);
						return mainDefinition['kind'] === 'OperationDefinition' && mainDefinition['operation'] === 'subscription';
					},
					ws,
					http,
				);

				return { cache: new InMemoryCache(), link };
			},
		},
	],
})
export class AppModule {}
