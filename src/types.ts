export interface User {
  id: string;
  username: string;
}

export interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: number;
}

export interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => void;
  register: (username: string, password: string) => void;
  logout: () => void;
}