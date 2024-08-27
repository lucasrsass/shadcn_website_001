'use client';

import {
  Bell,
  Bookmark,
  Home,
  List,
  Mail,
  MoreHorizontal,
  User,
  Users,
} from 'lucide-react';
import { SidebarDesktop } from './sidebarDesktop';
import { SidebarItems } from '@/app/components/types';
import { SidebarButton } from './sidebarButton';
import { useMediaQuery } from 'usehooks-ts';
import { SidebarMobile } from './sidebarMobile';

const sidebarItems: SidebarItems = {
  links: [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Notifications', href: '/item/notifications', icon: Bell },
    { label: 'Messages', href: '/item/messages', icon: Mail },
    {
      href: '/item/lists',
      icon: List,
      label: 'Lists',
    },
    {
      href: '/item/bookmarks',
      icon: Bookmark,
      label: 'Bookmarks',
    },
    {
      href: '/item/communities',
      icon: Users,
      label: 'Communities',
    },
    {
      href: '/item/profile',
      icon: User,
      label: 'Profile',
    },
  ],
  extras: (
    <div className="flex flex-col gap-2">
      <SidebarButton icon={MoreHorizontal} className="w-full">
        More
      </SidebarButton>
      <SidebarButton
        className="w-full justify-center text-white"
        variant="default"
      >
        Tweet
      </SidebarButton>
    </div>
  ),
};

export function sidebar() {
  const isDesktop = useMediaQuery('(min-width: 640px)', {
    initializeWithValue: false,
  });

  if (isDesktop) {
    return <SidebarDesktop sidebarItems={sidebarItems} />;
  }

  return <SidebarMobile sidebarItems={sidebarItems} />;
}
