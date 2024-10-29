'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Message {
  role: string;
  content: string;
}

interface ChatbotContextProps {
  messages: Message[];
  addMessage: (message: Message) => void;
}

const ChatbotContext = createContext<ChatbotContextProps | undefined>(undefined);

export const ChatbotProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const savedMessages = localStorage.getItem('chatbotMessages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chatbotMessages', JSON.stringify(messages));
    }
  }, [messages]);

  const addMessage = (message: Message) => {
    setMessages((prev) => [...prev, message]);
  };

  return (
    <ChatbotContext.Provider value={{ messages, addMessage }}>
      {children}
    </ChatbotContext.Provider>
  );
};

export const useChatbot = () => {
  const context = useContext(ChatbotContext);
  if (!context) {
    throw new Error('useChatbot must be used within a ChatbotProvider');
  }
  return context;
};