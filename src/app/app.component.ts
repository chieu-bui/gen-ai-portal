import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import _ from 'lodash';

import { SupergraphicComponent } from '@shared/components/supergraphic/supergraphic.component';
import { AppLoaderComponent } from '@components/app-loader/app-loader.component';
import { AppNotificationComponent } from '@components/app-notification/app-notification.component';
import { SseService } from '@shared/services/sse.service';
import { BackendConfigService } from '@shared/services/backend-config.service';
import { untilCmpDestroyed } from '@shared/decorator';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom, lastValueFrom } from 'rxjs';
import { SafeHtmlPipe } from "@shared/pipes/safeHtml.pipe";

@Component({
	standalone: true,
  	selector: 'app-root',
  	templateUrl: './app.component.html',
  	styleUrl: './app.component.scss',
  	imports: [ RouterOutlet, SupergraphicComponent, AppLoaderComponent, AppNotificationComponent, SafeHtmlPipe ],
})
export class AppComponent implements OnInit {

	public test: string = `<p>Angular is a platform and framework for building single-page client applications using HTML, CSS, and TypeScript. It is maintained by Google and offers a comprehensive solution that includes declarative templates, dependency injection, end-to-end tooling, and integrated best practices to solve development challenges.</p><h3 id="key-features-of-angular">Key Features of Angular</h3><ol><li><p><strong>Component-Based Architecture</strong>: Angular applications are structured around components, which are the building blocks of the UI. Each component combines the HTML, CSS, and logic for a portion of the interface.</p></li><li><p><strong>TypeScript</strong>: Angular is built with TypeScript, a statically typed superset of JavaScript that includes features like classes, interfaces, and modules. This helps in catching errors early and improving code maintainability.</p></li><li><p><strong>Dependency Injection (DI)</strong>: Angular has a powerful DI framework that allows you to inject dependencies into your components and services. This makes it easier to manage and test your code.</p></li><li><p><strong>Reactive Programming and RxJS</strong>: Angular uses reactive programming with RxJS (Reactive Extensions for JavaScript) to handle asynchronous operations, such as HTTP requests or user events, in a more efficient way.</p></li><li><p><strong>Modular Architecture</strong>: Angular applications are made up of modules, which allow you to break your application into smaller, reusable, and organized code blocks.</p></li><li><p><strong>Routing</strong>: Angular provides a powerful router to map URLs to components, allowing you to create a single-page application (SPA) with multiple views and navigation.</p></li><li><p><strong>Forms</strong>: Angular includes two different approaches to handling forms—template-driven and reactive. These approaches allow you to manage and validate form data efficiently.</p></li><li><p><strong>Testing</strong>: Angular is designed with testing in mind. It includes tools like Jasmine for unit tests and Protractor for end-to-end testing, making it easier to test every part of your application.</p></li><li><p><strong>Command Line Interface (CLI)</strong>: The Angular CLI assists in quickly generating components, services, modules, and other boilerplate code, as well as setting up a development environment with a local server, linting, and testing tools.</p></li></ol><h3 id="basic-example">Basic Example</h3><p>Here&#39;s a simple example to illustrate how Angular components work.</p><h4 id="installation">Installation</h4><p>First, make sure you have Node.js installed. Then, you can install the Angular CLI with:</p><pre><code class="language-sh">npm install -g @angular/cli</code></pre><h4 id="create-a-new-angular-project">Create a New Angular Project</h4><pre><code class="language-sh">ng new my-angular-appcd my-angular-app</code></pre><h4 id="generate-a-new-component">Generate a New Component</h4><p>You can generate a new component using the CLI:</p><pre><code class="language-sh">ng generate component hello-world</code></pre><p>This command will create a new component and update the module file accordingly.</p><h4 id="component-code-hello-worldcomponentts">Component Code (<code>hello-world.component.ts</code>)</h4><pre><code class="language-typescript">import { Component } from &#39;@angular/core&#39;;@Component({  selector: &#39;app-hello-world&#39;,  templateUrl: &#39;./hello-world.component.html&#39;,  styleUrls: [&#39;./hello-world.component.css&#39;]})export class HelloWorldComponent {  message: string = &#39;Hello, Angular!&#39;;}</code></pre><h4 id="template-hello-worldcomponenthtml">Template (<code>hello-world.component.html</code>)</h4><pre><code class="language-html">&lt;div&gt;  {{ message }}&lt;/div&gt;</code></pre><h4 id="using-the-component-appcomponenthtml">Using the Component (<code>app.component.html</code>)</h4><p>To use the new component, include its selector in the main template file:</p><pre><code class="language-html">&lt;app-hello-world&gt;&lt;/app-hello-world&gt;</code></pre><h4 id="running-the-application">Running the Application</h4><p>Start the development server with:</p><pre><code class="language-sh">ng serve</code></pre><p>Navigate to <code>http://localhost:4200/</code> in your web browser, and you should see the message &quot;Hello, Angular!&quot;.</p><h3 id="conclusion">Conclusion</h3><p>Angular is a powerful and comprehensive framework for building client-side applications. Its component-based architecture, strong typing with TypeScript, and modular approach make it a robust choice for developing complex applications. The Angular CLI further simplifies development by automating many routine tasks, allowing you to focus on building features.</p>`;
  	
	/**
   	* @constructor
   	* @param {TranslateService} _translateService
   	*/
	   constructor(
		private _translateService: TranslateService,
		private _backendConfigService: BackendConfigService,
		private _httpClient: HttpClient,
		private sseService: SseService,
	) {
		this._translateService.use('en');
	}

	/**
	 * @constructor
	 */
	ngOnInit() {
		// fetch('http://localhost:3000/stream', {
		// 	method: 'POST',
		// })
		// .then( (res) => {
		// 	const reader = res.body.getReader();

		// 	reader.read().then( function pump({ done, value }) {
		// 		const decodeStr: string = new TextDecoder().decode( value );
		// 		const parseData: any = JSON.parse( decodeStr );
				
		// 		console.log( done, parseData.choices?.[0]?.delta?.content );
				
		// 		if (done) {
		// 			console.log( 'done');
					
		// 			// Do something with last chunk of data then exit reader
		// 			return;
		// 		  }
			
		// 		  return reader.read().then( pump );

		// 	} )
		// })
	}
	
}
