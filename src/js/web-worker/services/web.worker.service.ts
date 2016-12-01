import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class WebWorkerService {
	protected   worker: Worker;
	protected   workerURL = '/data/web.worker.js';
	protected   workerMessage = new Subject<any>();
	public      workerMessage$ = this.workerMessage.asObservable();

	constructor() {
		this.worker = new Worker(this.workerURL);
		this.worker.onmessage = (message) => this.workerMessage.next(message.data);
	}

	public sendDataToWorker(data: any): void {
		this.worker.postMessage(data);
	};
}
