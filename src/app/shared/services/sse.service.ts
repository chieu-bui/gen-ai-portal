import { HttpClient } from "@angular/common/http";
import { Injectable, NgZone } from "@angular/core";
import { Observable, switchMap, map, of } from "rxjs";

@Injectable({ providedIn: "root" })
export class SseService {

	constructor(private _zone: NgZone, private _httpClient: HttpClient) {}

	getServerSentEvent(url: string): any {
		return new Observable(observer => {
			const eventSource = this.getEventSource(url);

			eventSource.onmessage = event => {
				this._zone.run(() => {
				observer.next(event);
				} );
			};

			eventSource.onerror = error => {
				this._zone.run(() => {
					observer.error(error);
					eventSource.close();
				});
			};
		});
	}

	private getEventSource(url: string): EventSource {
		return new EventSource(url);
	}
}
