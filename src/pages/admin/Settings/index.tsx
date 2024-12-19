import React from 'react';
import SettingsHeader from './SettingsHeader';
import SettingsSections from './SettingsSections';
import { settingsSections } from './data';

export default function AdminSettings() {
  return (
    <div className="space-y-6">
      <SettingsHeader />
      <SettingsSections sections={settingsSections} />
    </div>
  );
}