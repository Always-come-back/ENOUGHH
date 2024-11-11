import React, { createContext, useContext, useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { Message } from '../types';

interface MessageContextType {
  messages: Message[];
  addMessage: (text: string, sender: string) => void;
  isConnected: boolean;
}

const MessageContext = createContext<MessageContextType | null>(null);
const SOCKET_URL = 'wss://chat-server.stackblitz.io';

export const useMessages = () => {
  const context = useContext(MessageContext);
  if (!context) throw new Error('useMessages must be used within MessageProvider');
  return context;
};

export const MessageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const newSocket = io(SOCKET_URL, {
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    newSocket.on('connect', () => {
      setIsConnected(true);
      console.log('Connected to WebSocket server');
    });

    newSocket.on('disconnect', () => {
      setIsConnected(false);
      console.log('Disconnected from WebSocket server');
    });

    newSocket.on('message', (message: Message) => {
      setMessages(prev => [...prev, message]);
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  const addMessage = (text: string, sender: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: Date.now(),
    };

    if (socket?.connected) {
      socket.emit('message', newMessage);
    }
    setMessages(prev => [...prev, newMessage]);
  };

  return (
    <MessageContext.Provider value={{ messages, addMessage, isConnected }}>
      {children}
    </MessageContext.Provider>
  );
};