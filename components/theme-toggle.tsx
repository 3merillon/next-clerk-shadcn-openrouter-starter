'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Function to toggle theme
  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  if (!mounted) {
    // Render a placeholder or nothing until the component is mounted
    return <Button variant='outline' size='icon' disabled />;
  }

  return (
    <Button onClick={toggleTheme} variant='outline' size='icon' className='rounded-full'>
      {theme === 'light' ? (
        <Sun className='h-[1.2rem] w-[1.2rem] transition-all' />
      ) : (
        <Moon className='h-[1.2rem] w-[1.2rem] transition-all' />
      )}
      <span className='sr-only'>Toggle theme</span>
    </Button>
  );
}