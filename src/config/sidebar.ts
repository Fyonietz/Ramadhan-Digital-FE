// src/config/sidebar.ts
import {
  LayoutDashboard,
  Users,
  School,
  GraduationCap,
  Binoculars,
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
  {label :'Kelas',path:'/dashboard/kelas',icon:School},

  {label :'Kegiatan',path:'/dashboard/kegiatan',icon:Binoculars}
];
