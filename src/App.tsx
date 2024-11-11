import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { MessageProvider } from './context/MessageContext';
import { Layout } from './components/Layout';
import { AuthScreen } from './components/AuthScreen';
import { ChatScreen } from './components/ChatScreen';
import { useAuth } from './context/AuthContext';

const AppContent = () => {
  const { user } = useAuth();
  return user ? <ChatScreen /> : <AuthScreen />;
};

function App() {
  return (
    <AuthProvider>
      <MessageProvider>
        <Layout>
          <AppContent />
        </Layout>
      </MessageProvider>
    </AuthProvider>
  );
}

export default App;