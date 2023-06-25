import { socket } from "../components/pages/ChetPage";

export const socketEmiter = (eventType, payload) => {
  socket.emit(eventType, payload);
};
