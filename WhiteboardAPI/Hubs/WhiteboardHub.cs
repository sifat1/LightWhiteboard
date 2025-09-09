using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace WhiteboardAPI.Hubs
{
    public class WhiteboardHub : Hub
    {
        // Send draw data to all connected clients except sender
        public async Task SendDrawing(string boardId, object drawData)
        {
            await Clients.OthersInGroup(boardId).SendAsync("ReceiveDrawing", drawData);
        }

        // Join a specific whiteboard session
        public async Task JoinBoard(string boardId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, boardId);
        }

        // Leave a whiteboard session
        public async Task LeaveBoard(string boardId)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, boardId);
        }
    }
}
