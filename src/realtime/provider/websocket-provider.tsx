"use client";

import react from "react";
import { io, type Socket } from "socket.io-client";
import { toast } from "sonner";
import {
  API_URL,
  SOCKET_CONNECT_ERROR_EVENT,
  SOCKET_CONNECT_EVENT,
  SOCKET_DISCONNECT_EVENT,
  SOCKET_RECONNECT_EVENT,
} from "@/app.constants";
import { getBearerToken } from "@/components/auth/auth.actions";
import { useProjectId } from "@/hooks/useProjectId";

interface ISocketContext {
  socket: Socket | null;
  connected: boolean;
}

const SocketContext = react.createContext<ISocketContext>({
  socket: null,
  connected: false,
});

export function SocketProvider({ children }: { children: react.ReactNode }) {
  const [socket, setSocket] = react.useState<Socket | null>(null);
  const [connected, setConnected] = react.useState(false);
  const projectId = useProjectId();
  const socketRef = react.useRef<Socket | null>(null);

  react.useEffect(() => {
    if (!projectId) return;
    let isMounted = true;

    async function connect() {
      try {
        const token = (await getBearerToken()).replace("Bearer ", "");
        if (!token) {
          toast.error("Authentication Token not found for live connection");
          return;
        }
        const newSocket = io(API_URL, {
          auth: { token },
          query: { projectId },
          transports: ["websocket", "polling"],
          reconnection: true,
          reconnectionDelay: 1000,
          reconnectionAttempts: 5,
        });

        socketRef.current = newSocket;

        newSocket.on(SOCKET_CONNECT_EVENT, () => {
          if (!isMounted) return;
          setConnected(true);
          setSocket(newSocket);
          console.debug("WebSocket connected");
        });

        newSocket.on(SOCKET_DISCONNECT_EVENT, (reason) => {
          if (!isMounted) return;
          setConnected(false);
          console.debug("WebSocket disconnected:", reason);
        });

        newSocket.on(SOCKET_CONNECT_ERROR_EVENT, (error) => {
          console.error("WebSocket connection error:", error);
          toast.warning(
            "You are offline! Changes may not be visible to others",
          );
        });

        newSocket.on(SOCKET_RECONNECT_EVENT, () => {
          console.debug("Attempting WebSocket reconnection...");
        });
      } catch (error) {
        console.error("Failed to initialize WebSocket:", error);
      }
    }

    connect();

    return () => {
      isMounted = false;
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [projectId, toast]);

  const contextValue = react.useMemo(
    () => ({ socket, connected }),
    [socket, connected],
  );

  return (
    <SocketContext.Provider value={contextValue}>
      {children}
    </SocketContext.Provider>
  );
}

export const useSocket = () => react.useContext(SocketContext);
