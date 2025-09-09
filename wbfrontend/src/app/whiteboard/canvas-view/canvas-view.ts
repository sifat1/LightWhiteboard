import { Component, ElementRef, ViewChild } from '@angular/core';
import { WhiteboardService } from '../../services/whiteboard-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-canvas-view',
  templateUrl: './canvas-view.html',
  styleUrls: ['./canvas-view.css']
})
export class CanvasView {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private drawing = false;

  boardId = 'global-board';
  selectedTool: 'pen' | 'eraser' = 'pen';
  penColor = '#000000';
  eraserSize = 20;

  private lastX = 0;
  private lastY = 0;

  constructor(private whiteboardService: WhiteboardService, private route: ActivatedRoute) {
    this.boardId = this.route.snapshot.paramMap.get('id') || 'global-board';
  }

  ngOnInit(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;

    canvas.width = window.innerWidth - 50;
    canvas.height = window.innerHeight - 150;

    // Start SignalR connection and join the board
    this.whiteboardService.startConnection(this.boardId);

    // Subscribe to remote drawings
    this.whiteboardService.draw$.subscribe((data) => {
      this.drawRemote(data);
    });
  }

  onSelectColor(event: any) {
    this.penColor = event.target.value;
  }

  selectTool(tool: 'pen' | 'eraser') {
    this.selectedTool = tool;
  }

  startDrawing(event: MouseEvent) {
    this.drawing = true;
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    this.lastX = event.clientX - rect.left;
    this.lastY = event.clientY - rect.top;
  }

  stopDrawing() {
    this.drawing = false;
    this.ctx.beginPath();
  }

  draw(event: MouseEvent) {
    if (!this.drawing) return;

    const canvas = this.canvasRef.nativeElement;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    this.drawLocal(x, y, this.penColor, this.selectedTool, true);
  }

  private drawLocal(x: number, y: number, color: string, tool: 'pen' | 'eraser', emit: boolean) {
    if (tool === 'eraser') {
      this.ctx.clearRect(x - this.eraserSize / 2, y - this.eraserSize / 2, this.eraserSize, this.eraserSize);
    } else {
      this.ctx.lineWidth = 2;
      this.ctx.lineCap = 'round';
      this.ctx.strokeStyle = color;

      this.ctx.beginPath();
      this.ctx.moveTo(this.lastX, this.lastY);
      this.ctx.lineTo(x, y);
      this.ctx.stroke();
    }

    if (emit) {
      this.whiteboardService.sendDrawing(this.boardId, {
        x,
        y,
        prevX: this.lastX,
        prevY: this.lastY,
        color,
        tool
      });
    }

    // Update last position
    this.lastX = x;
    this.lastY = y;
  }

  private drawRemote(data: any) {
    if (data.tool === 'eraser') {
      this.ctx.clearRect(data.x - this.eraserSize / 2, data.y - this.eraserSize / 2, this.eraserSize, this.eraserSize);
    } else {
      this.ctx.beginPath();
      this.ctx.moveTo(data.prevX, data.prevY);
      this.ctx.lineTo(data.x, data.y);
      this.ctx.strokeStyle = data.color;
      this.ctx.lineWidth = 2;
      this.ctx.lineCap = 'round';
      this.ctx.stroke();
    }
  }

  ngOnDestroy() {
    this.whiteboardService.leaveBoard(this.boardId);
  }
}
