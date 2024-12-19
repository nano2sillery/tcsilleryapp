import React from 'react';
import type { SettingsSection } from './types';

interface SettingsCardProps {
  section: SettingsSection;
}

export default function SettingsCard({ section }: SettingsCardProps) {
  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center">
          <section.icon className="h-6 w-6 text-tertiary-500" />
          <h3 className="ml-3 text-lg font-medium text-gray-900">
            {section.title}
          </h3>
        </div>
        <p className="mt-1 text-sm text-gray-500">
          {section.description}
        </p>
        <dl className="mt-4 space-y-4">
          {section.items.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between"
            >
              <dt className="text-sm font-medium text-gray-600">
                {item.name}
              </dt>
              <dd className="text-sm text-gray-900">
                {item.status === 'success' ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {item.value}
                  </span>
                ) : (
                  item.value
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}