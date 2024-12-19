import { useState, useEffect } from 'react';
import { getActiveAnnouncement } from '@/services/announcements/queries';
import type { Announcement } from '@/types/announcement';

export function useAnnouncement() {
  const [announcement, setAnnouncement] = useState<Announcement | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadAnnouncement() {
      try {
        const data = await getActiveAnnouncement();
        if (mounted) {
          setAnnouncement(data);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError('Impossible de charger l\'annonce');
          setAnnouncement(null);
        }
      }
    }

    loadAnnouncement();

    return () => {
      mounted = false;
    };
  }, []);

  return { announcement, error };
}