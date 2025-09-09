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

  boardId = "global-board";
  selectedTool: 'pen' | 'eraser' = 'pen';
  penColor = '#000000';
  eraserSize = 20;

  private lastEmit = 0;
  private emitInterval = 16; 

  constructor(private whiteboardService: WhiteboardService, private route: ActivatedRoute) {
    this.boardId = this.route.snapshot.paramMap.get('id') || 'global-board';
  }

  ngOnInit(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;

    canvas.width = window.innerWidth - 50;
    canvas.height = window.innerHeight - 150;

    // Start SignalR connection
    this.whiteboardService.startConnection(this.boardId);

    // Subscribe to incoming drawings
    this.whiteboardService.draw$.subscribe((data) => {
      this.drawOnCanvas(data.x, data.y, data.color, data.tool, false);
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
    this.draw(event);
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

    this.drawOnCanvas(x, y, this.penColor, this.selectedTool, true);
  }

  drawOnCanvas(x: number, y: number, color: string, tool: 'pen' | 'eraser', emit: boolean) {
    if (tool === 'eraser') {
      this.ctx.clearRect(x - this.eraserSize / 2, y - this.eraserSize / 2, this.eraserSize, this.eraserSize);
    } else {
      this.ctx.lineWidth = 2;
      this.ctx.lineCap = 'round';
      this.ctx.strokeStyle = color;

      this.ctx.lineTo(x, y);
      this.ctx.stroke();
      this.ctx.beginPath();
      this.ctx.moveTo(x, y);
    }

    if (emit) {
      const now = Date.now();
      if (now - this.lastEmit > this.emitInterval) {
        this.whiteboardService.sendDrawing(this.boardId, { x, y, color, tool });
        this.lastEmit = now;
      }
    }
  }
}
