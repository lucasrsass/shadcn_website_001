'use client';

import { useState, useRef } from 'react';
import { SidebarItems } from '@/types';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from './ui/sheet';
import { Button } from './ui/button';
import { Menu, X } from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { SidebarButtonSheet as SidebarButton } from './sidebarButton';
import { usePathname } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface SidebarMobileProps {
  sidebarItems: SidebarItems;
}

export function SidebarMobile(props: SidebarMobileProps) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  const startClosingSidebar = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsSidebarOpen(false);
    }, 1500); // Close after 1500ms (slide duration)
  };

  const handleMouseLeave = () => {
    startClosingSidebar();
  };

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  return (
    <Sheet open={isSidebarOpen} onOpenChange={openSidebar}>
      <SheetTrigger asChild>
        {!isSidebarOpen && (
          <Button size="icon" variant="ghost" className="fixed top-3 left-3">
            <Menu size={20} />
          </Button>
        )}
      </SheetTrigger>
      <SheetContent
        side="left"
        className="px-3 py-4 transform transition-transform ease-in-out"
        style={{
          transitionDuration: isSidebarOpen ? '500ms' : '1500ms',
        }}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        hideClose
      >
        <SheetHeader className="flex flex-col space-y-1 text-foreground">
          <span className="text-2xl font-semibold mx-3">Lucas R Sass</span>
          <span className="text-lg font-normal mx-3">
            Principal Biomedical Engineer
          </span>
        </SheetHeader>
        <div className="h-full mt-5 flex flex-col w-full gap-1">
          {props.sidebarItems.links.map(
            (
              link: { label: string; href: string; icon?: LucideIcon },
              idx: number
            ) => (
              <Link key={idx} href={link.href}>
                <SidebarButton
                  variant={pathname === link.href ? 'secondary' : 'ghost'}
                  icon={link.icon}
                  className="w-full"
                >
                  {link.label}
                </SidebarButton>
              </Link>
            )
          )}
          {props.sidebarItems.extras}
        </div>
      </SheetContent>
    </Sheet>
  );
}
