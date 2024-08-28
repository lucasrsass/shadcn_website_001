'use client';

import {
  BookOpenText,
  FolderOpen,
  Scroll,
  Mail,
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
    { label: 'About Me', href: '/', icon: User },
    {
      href: '/item/portfolio',
      icon: FolderOpen,
      label: 'Portfolio',
    },
    {
      href: '/item/lists',
      icon: Scroll,
      label: 'Ciriculum Vitea',
    },
    {
      href: '/item/bookmarks',
      icon: BookOpenText,
      label: 'Publications',
    },
    {
      href: '/item/communities',
      icon: Users,
      label: 'Collaborations',
    },
  ],
  extras: (
    <div className="flex flex-col gap-2">
      <SidebarButton
        className="w-full justify-center text-white"
        variant="default"
      >
        Contact
      </SidebarButton>
    </div>
  ),
};

export function Sidebar() {
  const isDesktop = useMediaQuery('(min-width: 640px)', {
    initializeWithValue: false,
  });

  if (isDesktop) {
    return <SidebarDesktop sidebarItems={sidebarItems} />;
  }

  return <SidebarMobile sidebarItems={sidebarItems} />;
}
