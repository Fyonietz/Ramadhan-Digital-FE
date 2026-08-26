// src/config/sidebar.ts
import {
  LayoutDashboard,
  Users,
  LineChart,
  Wallet,
  TrendingUp,
  School,
  GraduationCap,
  UserCheck,
  Calendar,
  Binoculars,
  History,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface SidebarItem {
  label: string;
  path?: string; // opsional jika item ini hanya memiliki children
  icon: LucideIcon;
  children?: SidebarItem[];
}

export const sidebarItems: SidebarItem[] = [
  { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  {
    label: 'Users',
    icon: Users,
    children: [
      { label: 'Siswa', path: '/dashboard/users/siswa', icon: GraduationCap },
      { label: 'Guru', path: '/dashboard/users/guru', icon: Users },
    ],
  },
];
