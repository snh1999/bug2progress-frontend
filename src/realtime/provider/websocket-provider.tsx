"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";
import { getBearerToken } from "@/components/auth/auth.actions";
import { useProjectId } from "@/hooks/useProjectId";
import { toast } from "sonner";
import {
  API_URL,
  SOCKET_CONNECT_ERROR_EVENT,
  SOCKET_CONNECT_EVENT,
  SOCKET_DISCONNECT_EVENT,
  SOCKET_RECONNECT_EVENT,
} from "@/app.constants";

interface ISocketContext {
  socket: Socket | null;
  connected: boolean;
}

const SocketContext = createContext<ISocketContext>({
  socket: null,
  connected: false,
});

export function SocketProvider({ children }: { children: ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);
  const projectId = useProjectId();
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
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

  const contextValue = useMemo(
    () => ({ socket, connected }),
    [socket, connected],
  );

  return (
    <SocketContext.Provider value={contextValue}>
      {children}
    </SocketContext.Provider>
  );
}

export const useSocket = () => useContext(SocketContext);
