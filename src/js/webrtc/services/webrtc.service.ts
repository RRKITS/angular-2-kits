import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { IJoinRoomOptions } from '../interface/webrtc.interface';

@Injectable()
export class WebRTCService {

	protected   skylink = new Skylink();
	protected   peerLeft = new Subject<any>();
	protected   peerJoined = new Subject<any>();
	protected   roomConnected = new Subject<any>();
	protected   incomingMessage = new Subject<any>();
	protected   appKey = "c57fad80-76e5-4bd5-bba5-03f17b414abb";
	
	public      peerId: string;
	public      peerLeft$ = this.peerLeft.asObservable();
	public      peerJoined$ = this.peerJoined.asObservable();
	public      roomConnected$ = this.roomConnected.asObservable();
	public      incomingMessage$ = this.incomingMessage.asObservable();
	
	constructor() {
		this.skylink.init(this.appKey, () => this.join("test_room", {} as IJoinRoomOptions, this.onRoomConnected.bind(this)));

		this.bindEvents();
	}

	protected bindEvents(): void {
		this.skylink.on('peerLeft', this.onPeerLeft.bind(this));
		this.skylink.on('peerJoined', this.onPeerJoined.bind(this));
		this.skylink.on('incomingMessage', this.onMessage.bind(this));
	}

	protected onRoomConnected(error, success): void {
		this.roomConnected.next({});
	}

	protected onPeerJoined(peerId: string, peerInfo: any, isSelf: boolean): void {
		if (isSelf) {
			this.peerId = peerId;
			return;
		}

		this.peerJoined.next({ peerId, peerInfo, isSelf });
	}

	protected onPeerLeft(peerId: string, peerInfo: any, isSelf: boolean) {
		if (isSelf) {
			return;
		}

		this.peerLeft.next({ peerId, peerInfo, isSelf });
	}

	protected onMessage(message: any, peerId: string, peerInfo: any, isSelf: boolean) {
		if (isSelf) {
			return;
		}

		this.incomingMessage.next({ message, peerId, peerInfo, isSelf });
	}

	public join(roomName: string, options?: IJoinRoomOptions, callback?: Function): void {
		this.skylink.joinRoom(roomName, options, callback);
	}
	
	public sendMessage(message: string) {
		this.skylink.sendP2PMessage(message);
	}
}
