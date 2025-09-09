import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WhiteboardService {
  private hubConnection!: signalR.HubConnection;
  public draw$ = new Subject<any>();

  startConnection(boardId: string) {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`https://localhost:5001/whiteboardHub?boardId=${boardId}`)
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .catch(err => console.error('SignalR connection error:', err));

    this.hubConnection.on('ReceiveDrawing', (data) => {
      this.draw$.next(data);
    });
  }

  sendDrawing(boardId: string, data: any) {
    this.hubConnection.invoke('SendDrawing', boardId, data)
      .catch(err => console.error(err));
  }
}
