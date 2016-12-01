import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SocketService {
	protected   socket = io(location.origin);
	protected   socketMessage = new Subject<any>();
	protected   socketConnection = new Subject<any>();
	public      socketMessage$ = this.socketMessage.asObservable();
	public      socketConnection$ = this.socketConnection.asObservable();

	constructor() {
		this.socket.on('connected', (id) => this.socketConnection.next(id.name));
		this.socket.on('message', (message) => this.socketMessage.next(message));
	}

	sendMessage(message: string) {
		this.socket.emit('message', message);
	}
}
