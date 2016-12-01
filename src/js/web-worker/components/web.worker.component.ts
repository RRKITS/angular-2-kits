import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { WebWorkerService } from '../services/web.worker.service';

@Component({
	selector: 'web-worker',
	template: '<p>WEB WORKER DATA: {{data}}</p>'
})

export class WebWorkerComponent implements OnInit {
	protected data = '';

	constructor(private ref: ChangeDetectorRef, private webWorkerService: WebWorkerService) {}

	ngOnInit() {
		this.webWorkerService.workerMessage$.subscribe((data) => {
			this.data = data;
			this.ref.detectChanges(); //needed to force re-render
		});

		this.webWorkerService.sendDataToWorker('Test data');
	}
}

