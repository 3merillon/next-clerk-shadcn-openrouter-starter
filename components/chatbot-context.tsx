'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Message {
  role: string;
  content: string;
}

interface ChatbotContextProps {
  messages: Message[];
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  widgetHeight: number;
  setWidgetHeight: (height: number) => void;
  addMessage: (message: Message) => void;
}

const ChatbotContext = createContext<ChatbotContextProps | undefined>(undefined);

export const ChatbotProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
  const [widgetHeight, setWidgetHeight] = useState<number>(384); // Default height of 96 (h-96) in pixels

  useEffect(() => {
    const savedMessages = localStorage.getItem('chatbotMessages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }

    const savedIsCollapsed = localStorage.getItem('chatbotIsCollapsed');
    if (savedIsCollapsed !== null) {
      setIsCollapsed(JSON.parse(savedIsCollapsed));
    }

    const savedWidgetHeight = localStorage.getItem('chatbotWidgetHeight');
    if (savedWidgetHeight !== null) {
      setWidgetHeight(JSON.parse(savedWidgetHeight));
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chatbotMessages', JSON.stringify(messages));
    }
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('chatbotIsCollapsed', JSON.stringify(isCollapsed));
  }, [isCollapsed]);

  useEffect(() => {
    localStorage.setItem('chatbotWidgetHeight', JSON.stringify(widgetHeight));
  }, [widgetHeight]);

  const addMessage = (message: Message) => {
    setMessages((prev) => [...prev, message]);
  };

  return (
    <ChatbotContext.Provider value={{ messages, isCollapsed, setIsCollapsed, widgetHeight, setWidgetHeight, addMessage }}>
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