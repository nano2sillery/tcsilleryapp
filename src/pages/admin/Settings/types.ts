import { LucideIcon } from 'lucide-react';

export interface SettingsItem {
  name: string;
  value: string;
  status?: 'success';
}

export interface SettingsSection {
  title: string;
  icon: LucideIcon;
  description: string;
  items: SettingsItem[];
}