import { Server } from 'socket.io';

let io;

export function initSocketServer(httpServer) {
    io = new Server(httpServer, {
        cors: {
            origin: "http://localhost:5173",
            credentials: true
        }
    });
    console.log("Socket io server is RUNNING")

    io.on("connection", (socket)=>{
        console.log("A user connected: " + socket.id);
    });
}

export function getIO(){
    if (!io) {
        throw new Error("Socket.io server not initialized. Call initSocketServer first.");
    }

    return io;
}