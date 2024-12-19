export function formatDate(date: Date | string): string {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(dateObj);
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Date invalide';
  }
}

export function toISODateString(date: Date | string | undefined): string {
  if (!date) return new Date().toISOString().split('T')[0];
  
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    // Handle Firebase Timestamp
    if ('toDate' in dateObj) {
      return dateObj.toDate().toISOString().split('T')[0];
    }
    return dateObj.toISOString().split('T')[0];
  } catch (error) {
    console.error('Error converting date to ISO string:', error);
    return new Date().toISOString().split('T')[0];
  }
}

export function parseDate(dateString: string): Date {
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
}