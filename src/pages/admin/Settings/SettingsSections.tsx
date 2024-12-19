import React from 'react';
import SettingsCard from './SettingsCard';
import type { SettingsSection } from './types';

interface SettingsSectionsProps {
  sections: SettingsSection[];
}

export default function SettingsSections({ sections }: SettingsSectionsProps) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {sections.map((section) => (
        <SettingsCard key={section.title} section={section} />
      ))}
    </div>
  );
}