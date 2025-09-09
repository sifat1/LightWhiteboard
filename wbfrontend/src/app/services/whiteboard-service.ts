import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WhiteboardService {
  private hubConnection!: signalR.HubConnection;
  private connected = false;
  private pendingDrawings: any[] = [];
  public draw$ = new Subject<any>();

  startConnection(boardId: string) {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`/whiteboardHub?boardId=${boardId}`)
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .then(() => {
        console.log('SignalR connected');
        this.connected = true;

        
        this.pendingDrawings.forEach(d => this.sendDrawing(boardId, d));
        this.pendingDrawings = [];
      })
      .catch(err => console.error('SignalR connection error:', err));

    this.hubConnection.on('ReceiveDrawing', (data) => {
      this.draw$.next(data);
    });
  }

  sendDrawing(boardId: string, data: any) {
    if (this.connected) {
      this.hubConnection.invoke('SendDrawing', boardId, data)
        .catch(err => console.error('SendDrawing error:', err));
    } else {
      this.pendingDrawings.push(data);
    }
  }
}
