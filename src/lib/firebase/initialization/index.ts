import { COLLECTIONS } from '@/lib/constants';
import { initializeAnnouncements } from './announcements';
import { initializeCollection, checkCollectionExists } from './collections';

export async function initializeDatabase(): Promise<boolean> {
  try {
    // Initialize collections in parallel for better performance
    const initPromises = Object.entries(COLLECTIONS).map(async ([name, path]) => {
      try {
        const exists = await checkCollectionExists(path);
        if (!exists) {
          if (name === 'ANNOUNCEMENTS') {
            await initializeAnnouncements();
          } else {
            await initializeCollection(path);
          }
        }
        return true;
      } catch (error) {
        console.error(`Error initializing ${name}:`, error);
        return false;
      }
    });

    const results = await Promise.all(initPromises);
    return results.every(Boolean);
  } catch (error) {
    console.error('Database initialization error:', error);
    return false;
  }
}