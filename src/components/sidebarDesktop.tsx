'use client';

import { useState, useRef } from 'react';
import { SidebarButton } from './sidebarButton';
import { SidebarItems } from '@/types';
import Link from 'next/link';
import { Button } from './ui/button';
import { Menu } from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface SidebarDesktopProps {
  sidebarItems: SidebarItems;
}

export function SidebarDesktop(props: SidebarDesktopProps) {
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
    <div>
      {!isSidebarOpen && (
        <Button
          size="icon"
          variant="ghost"
          className="fixed top-3 left-3 z-50"
          onClick={openSidebar}
        >
          <Menu size={20} />
        </Button>
      )}

      <aside
        className={`fixed left-0 top-0 h-screen w-[270px] max-w-xs z-40 border-r bg-[#0a1220] transform transition-transform ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{
          transitionDuration: isSidebarOpen ? '500ms' : '1500ms',
        }}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
      >
        <div className="h-full px-3 py-4">
          <div className="mx-5 mb-4">
            <h3 className="text-2xl font-semibold" style={{ color: '#64b1de' }}>
              Lucas Sass
            </h3>
            <h4 className="text-lg font-normal text-foreground">
              Principal Engineer
            </h4>
          </div>
          <div className="mt-5">
            <div className="flex flex-col gap-1 w-full">
              {props.sidebarItems.links.map(
                (
                  link: { label: string; href: string; icon?: LucideIcon },
                  index: number
                ) => (
                  <Link key={index} href={link.href}>
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
          </div>
        </div>
      </aside>
    </div>
  );
}
