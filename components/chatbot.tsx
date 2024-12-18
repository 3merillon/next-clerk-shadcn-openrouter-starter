'use client';

import React, { useState, useLayoutEffect, useRef, useCallback } from 'react';
import { useChatbot } from './chatbot-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function Chatbot() {
  const [input, setInput] = useState('');
  const { messages, isCollapsed, setIsCollapsed, widgetHeight, setWidgetHeight, addMessage } = useChatbot();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [initialRender, setInitialRender] = useState(true);
  const [disableTransition, setDisableTransition] = useState(false);
  const previousMessagesLength = useRef(messages.length);
  const isThrottled = useRef(false);

  const isBrowser = typeof window !== 'undefined';

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  };
  
  useLayoutEffect(() => {
    if (!isBrowser) return;

    const savedScrollPosition = localStorage.getItem('chatbotScrollPosition');
    if (savedScrollPosition && scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = Number(savedScrollPosition);
    }
    setInitialRender(false);
  }, [isBrowser]);

  useLayoutEffect(() => {
    if (!isBrowser) return;

    if (messages.length > previousMessagesLength.current) {
      scrollToBottom();
    }
    previousMessagesLength.current = messages.length;
  }, [messages, isBrowser]);

  useLayoutEffect(() => {
    if (!isBrowser) return;

    const handleScroll = () => {
      if (scrollAreaRef.current && !initialRender) {
        const scrollPosition = scrollAreaRef.current.scrollTop.toString();
        localStorage.setItem('chatbotScrollPosition', scrollPosition);
      }
    };

    const scrollArea = scrollAreaRef.current;
    scrollArea?.addEventListener('scroll', handleScroll);
    return () => scrollArea?.removeEventListener('scroll', handleScroll);
  }, [initialRender, isBrowser]);

  useLayoutEffect(() => {
    if (!isBrowser) return;

    const updateMaxHeight = () => {
      const newMaxHeight = window.innerHeight - 116;
      if (widgetHeight > newMaxHeight) {
        setWidgetHeight(newMaxHeight);
      }
    };

    window.addEventListener('resize', updateMaxHeight);
    return () => window.removeEventListener('resize', updateMaxHeight);
  }, [widgetHeight, setWidgetHeight, isBrowser]);

  const handleMouseDown = () => {
    setIsResizing(true);
    setDisableTransition(true);
    document.body.style.userSelect = 'none';
    if (scrollAreaRef.current) {
      scrollAreaRef.current.parentElement?.classList.add('no-scrollbars');
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsResizing(true);
    setDisableTransition(true);
    document.body.style.userSelect = 'none';
    document.body.style.overflow = 'hidden';
    e.preventDefault();
    if (scrollAreaRef.current) {
      scrollAreaRef.current.parentElement?.classList.add('no-scrollbars');
    }
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isResizing || isThrottled.current) return;

    isThrottled.current = true;
    setTimeout(() => {
      const newHeight = window.innerHeight - e.clientY - 32;
      const maxHeight = window.innerHeight - 116;
      if (newHeight > 112 && newHeight < maxHeight) {
        setWidgetHeight(newHeight);
      }
      isThrottled.current = false;
    }, 10);
  }, [isResizing, setWidgetHeight]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isResizing || isThrottled.current) return;

    isThrottled.current = true;
    setTimeout(() => {
      const touch = e.touches[0];
      const newHeight = window.innerHeight - touch.clientY - 32;
      const maxHeight = window.innerHeight - 116;
      if (newHeight > 112 && newHeight < maxHeight) {
        setWidgetHeight(newHeight);
      }
      isThrottled.current = false;
    }, 10);
    e.preventDefault();
  }, [isResizing, setWidgetHeight]);

  const handleMouseUp = useCallback(() => {
    setIsResizing(false);
    setDisableTransition(false);
    document.body.style.userSelect = '';
    if (scrollAreaRef.current) {
      scrollAreaRef.current.parentElement?.classList.remove('no-scrollbars');
    }
  }, []);

  const handleTouchEnd = useCallback(() => {
    setIsResizing(false);
    setDisableTransition(false);
    document.body.style.userSelect = '';
    document.body.style.overflow = '';
    if (scrollAreaRef.current) {
      scrollAreaRef.current.parentElement?.classList.remove('no-scrollbars');
    }
  }, []);

  useLayoutEffect(() => {
    if (!isBrowser) return;

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isResizing, handleMouseMove, handleTouchMove, handleMouseUp, handleTouchEnd, isBrowser]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    if (isCollapsed) {
      setIsCollapsed(false);
    }

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
    const baseClass = 'inline-block p-3 border-2 border-dotted max-w-[88%] text-left flex items-start relative break-all whitespace-pre-wrap overflow-hidden';
    switch (role) {
      case 'user':
        return `${baseClass} rounded-l-lg border-orange-500 border-r-0 ml-2 max-w-full text-right`;
      case 'ai':
        return `${baseClass} rounded-r-lg border-sky-500 border-l-0 mr-2`;
      case 'system':
        return `${baseClass} rounded-r-lg border-red-500 border-l-0 mr-2`;
      default:
        return '';
    }
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const maxHeight = isBrowser ? window.innerHeight - 116 : 0;

  return (
    <div
      className={`fixed bottom-4 right-4 w-80 bg-background text-foreground border border-muted-background rounded-lg flex flex-col ${
        disableTransition ? '' : 'transition-all ease-in-out'
      } ${
        isCollapsed ? 'h-[58px]' : ''
      }`}
      style={{ height: isCollapsed ? '58px' : `${Math.min(widgetHeight, maxHeight)}px` }}
    >
      <Button
        size="icon"
        onClick={toggleCollapse}
        className="absolute top-2 left-2 z-10 rounded-full text-white"
      >
        {isCollapsed ? <ChevronUp /> : <ChevronDown />}
      </Button>
      {!isCollapsed && (
        <div
          className="absolute top-1 left-1/3 right-1/3 h-5 bg-background border cursor-row-resize transform -translate-y-6 rounded-t-lg flex justify-center items-center"
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          <div className="grid grid-cols-3 grid-rows-2 gap-1">
            <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
            <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
            <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
            <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
            <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
            <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
          </div>
        </div>
      )}
      <div className="relative flex-grow overflow-hidden">
        <ScrollArea
          className={`border-b border-foreground flex-grow p-0 ${
            isCollapsed ? 'h-0 opacity-0 overflow-hidden' : 'h-full opacity-100 overflow-y-auto'
          }`}
          ref={scrollAreaRef}
          style={{ maxWidth: '100%' }}
        >
          <div className="p-0 max-w-full">
            {messages.map((msg, index) => (
              <div key={index} className={`flex items-start mb-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`relative flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <span className={getMessageClassNames(msg.role)}>
                    <div 
                      className={`absolute ${msg.role === 'user' ? 'right-0' : 'left-0'} w-8 h-8 rounded-full overflow-hidden`} 
                      style={{ margin: '3px' }}
                    ></div>
                    <span 
                      className={`flex-grow ${msg.role === 'user' ? 'order-1' : ''} overflow-hidden break-words whitespace-pre-wrap`} 
                      style={{ 
                        textAlign: msg.role === 'user' ? 'right' : 'left',
                        wordBreak: 'break-word',
                        overflowWrap: 'break-word',
                        minWidth: 0,
                        maxWidth: '100%'
                      }}
                    >
                      {msg.content}
                    </span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
      <form onSubmit={handleSubmit} className="flex items-center p-2 bg-accent rounded-b-lg">
        <div className="flex items-center w-full">
          <div className={`transition-all ease-in-out ${isCollapsed ? 'w-1/5' : 'w-0'}`} />
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className={`rounded-l-full border bg-background text-foreground focus:outline-none focus:ring-orange-500 transition-all ease-in-out ${
              isCollapsed ? 'w-4/5' : 'flex-grow'
            }`}
            placeholder="Ask me[ai] anything..."
          />
          <Button type="submit" className="text-white p-3 border rounded-r-full">
            Send&nbsp;
          </Button>
        </div>
      </form>
    </div>
  );
}