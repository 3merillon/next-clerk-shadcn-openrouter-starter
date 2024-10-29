'use client';

import React, { useState, useLayoutEffect, useRef } from 'react';
import { useChatbot } from './chatbot-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function Chatbot() {
  const [input, setInput] = useState('');
  const { messages, addMessage } = useChatbot();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  };

  useLayoutEffect(scrollToBottom, [messages]);

  useLayoutEffect(() => {
    const handleScroll = () => {
      if (scrollAreaRef.current) {
        localStorage.setItem('chatbotScrollPosition', scrollAreaRef.current.scrollTop.toString());
      }
    };

    const scrollArea = scrollAreaRef.current;
    scrollArea?.addEventListener('scroll', handleScroll);
    return () => scrollArea?.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    addMessage({ role: 'user', content: input });

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) throw new Error('Failed to get response');

      const data = await response.json();
      addMessage({ role: 'ai', content: data.choices[0].message.content });
    } catch (error) {
      console.error('Error:', error);
      addMessage({ role: 'system', content: 'Sorry, there was an error processing your request.' });
    }

    setInput('');
  };

  const getMessageClassNames = (role: string) => {
    const baseClass = 'inline-block p-3 border-2 border-dotted max-w-[88%] text-left flex items-start relative';
    switch (role) {
      case 'user':
        return `${baseClass} rounded-l-lg border-orange-500 border-r-0 ml-2`;
      case 'ai':
        return `${baseClass} rounded-r-lg border-sky-500 border-l-0 mr-2`;
      case 'system':
        return `${baseClass} rounded-r-lg border-red-500 border-l-0 mr-2`;
      default:
        return '';
    }
  };

  return (
    <div className="fixed bottom-4 right-4 w-80 h-96 bg-background text-foreground border border-muted-background rounded-lg flex flex-col">
      <ScrollArea className="flex-grow overflow-y-auto p-0" ref={scrollAreaRef}>
        <div className="p-0">
          {messages.map((msg, index) => (
            <div key={index} className={`flex items-start mb-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`relative flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <span className={getMessageClassNames(msg.role)}>
                  <div className={`absolute ${msg.role === 'user' ? 'right-0' : 'left-0'} w-8 h-8 rounded-full overflow-hidden`} style={{ margin: '3px' }}></div>
                  <span className={`flex-grow ${msg.role === 'user' ? 'order-1' : ''}`} style={{ textAlign: msg.role === 'user' ? 'right' : 'left' }}>
                    {msg.content}
                  </span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <form onSubmit={handleSubmit} className="flex items-center p-2 border-t border-foreground bg-accent rounded-b-lg">
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="rounded-l-full border flex-grow bg-background text-foreground focus:outline-none focus:ring-orange-500 transition-all duration-300 ease-in-out"
          placeholder="Type your message..."
        />
        <Button type="submit" className="text-white p-3 border rounded-r-full">
          Send&nbsp;
        </Button>
      </form>
    </div>
  );
}