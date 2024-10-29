'use client';

import Link from 'next/link';
import { useState } from 'react';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Menu } from 'lucide-react';

import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className='py-4 fixed w-full bg-ccbg backdrop-blur-md border-b border-orange-500 border-dashed z-50'>
      <nav className='container flex items-center justify-between'>
        {/* Left side: Menu items or Hamburger icon */}
        <div className='flex items-center'>
          <ul className='hidden lg:flex gap-10 text-sm font-medium'>
            <li>
              <Link href='/'>Home</Link>
            </li>
            <li>
              <Link href='/protected/client'>Protected (client)</Link>
            </li>
            <li>
              <Link href='/protected/server'>Protected (server)</Link>
            </li>
            <li>
              <Link href='/api/me'>Who am I?</Link>
            </li>
          </ul>

          {/* Hamburger Icon for smaller screens */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='outline'
                size='icon'
                className='lg:hidden'
                onClick={toggleMenu}
              >
                <Menu className='h-5 w-5' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='start'>
              <DropdownMenuItem asChild>
                <Link href='/' onClick={toggleMenu}>Home</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href='/protected/client' onClick={toggleMenu}>Protected (client)</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href='/protected/server' onClick={toggleMenu}>Protected (server)</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href='/api/me' onClick={toggleMenu}>Who am I?</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Right side: ThemeToggle and User/Sign-in button */}
        <div className='flex items-center gap-6'>
          <ThemeToggle />

          <SignedOut>
            <SignInButton mode='modal'>
              <Button size='sm' className='rounded-full'>Sign in</Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
}