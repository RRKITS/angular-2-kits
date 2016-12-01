import { Component, OnInit } from '@angular/core';
import { WebRTCService } from '../services/webrtc.service';

@Component({
	selector: 'webrtc',
	template: ''
})

export class WebRTCComponent implements OnInit {
	constructor(private webRTCService: WebRTCService) {}

	ngOnInit() {
		this.webRTCService.peerLeft$.subscribe(this.onPeerLeft.bind(this));
		this.webRTCService.peerJoined$.subscribe(this.onPeerJoined.bind(this));
		this.webRTCService.incomingMessage$.subscribe(this.onMessage.bind(this));
		this.webRTCService.roomConnected$.subscribe(this.sendMessage.bind(this));
	}

	sendMessage(): void {
		setTimeout(() => this.webRTCService.sendMessage(`Hello, I'm ${this.webRTCService.peerId}`), 2000);
	}

	onPeerJoined(data: any): void {
		console.log(`%c [WEBRTC]: ${data.peerId}, has joined this room`, 'color: blue');
	}

	onPeerLeft(data: any): void {
		console.log(`%c [WEBRTC]: ${data.peerId}, has left this room`, 'color: blue');
	}

	onMessage(data): void {
		console.log(`%c [WEBRTC]: ${data.message.content}`, 'color: blue');
	}
}
