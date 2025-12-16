import { io } from "socket.io-client";
import { LOCAL_IP } from "../constants/constant";

export const socket = io(`http://${LOCAL_IP}:5000`, {
  transports: ["websocket"],
  autoConnect: false, // DO NOT auto-connect before login
});
