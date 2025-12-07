import { useEffect } from "react";
import { socket } from "../socket/socket";

export default function useChatSocket(userId, otherUserId, onReceiveMessage) {
  useEffect(() => {
    if (!socket.connected) socket.connect();

    // Join a private chat room
    socket.emit("joinChat", { userId, otherUserId });

    // Listen for incoming messages
    const handleMessage = (msg) => {
      onReceiveMessage(msg);
    };

    socket.on("receiveMessage", handleMessage);

    return () => {
      socket.off("receiveMessage", handleMessage);
    };
  }, [userId, otherUserId]);
}
