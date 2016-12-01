import { Component, OnInit } from '@angular/core';
import { SocketService } from '../services/socket.service';

@Component({
	selector: 'socket',
	template: ''
})

export class SocketComponent implements OnInit {
	constructor(private socketService: SocketService) {}

	ngOnInit() {
		this.socketService.socketConnection$.subscribe(this.onConnection.bind(this));
		this.socketService.socketMessage$.subscribe(this.onMessage.bind(this));

		this.socketService.sendMessage('Hello');
	}

	// all connections not only current one
	onConnection(name: string): void {
		console.log(`%c [SOCKET.IO]: user connected. Id: ${name}`, 'color: #26a001');
	}
	
	onMessage(message: string) {
		console.log(`%c [SOCKET.IO]: Message received: ${message}`, 'color: #26a001');
	}
}

