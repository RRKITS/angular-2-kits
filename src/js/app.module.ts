import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_PROVIDERS } from '@angular/http';
import { WebWorkerService } from './web-worker/services/web.worker.service';
import { WebRTCService } from './webrtc/services/webrtc.service';
import { SocketService } from './socket/services/socket.service';
import { AppComponent }  from './app.component';
import { WebWorkerComponent }  from './web-worker/components/web.worker.component';
import { WebRTCComponent }  from './webrtc/components/webrtc.component';
import { SocketComponent }  from './socket/components/socket.component';
import { FormComponent }  from './forms/components/form.component';

@NgModule({
	imports: [[BrowserModule, FormsModule, ReactiveFormsModule]],
	declarations: [[AppComponent, WebWorkerComponent], [WebRTCComponent], [SocketComponent], [FormComponent]],
	bootstrap: [[AppComponent]],
	providers: [[HTTP_PROVIDERS], [WebWorkerService], [WebRTCService], [SocketService]]
})

export class AppModule {}
