import { Settings, Database, Shield } from 'lucide-react';
import type { SettingsSection } from './types';

export const settingsSections: SettingsSection[] = [
  {
    title: 'Général',
    icon: Settings,
    description: 'Informations générales du club',
    items: [
      { name: 'Nom du club', value: 'Tennis Club de Sillery' },
      { name: 'Adresse', value: '51 rue de la Vesle, 51500 Sillery' },
      { name: 'Email de contact', value: 'contact@tcsillery.fr' },
      { name: 'Version', value: '1.0.0' }
    ]
  },
  {
    title: 'Base de données',
    icon: Database,
    description: 'Informations sur la base de données',
    items: [
      { name: 'Statut', value: 'Connecté', status: 'success' },
      { name: 'Dernière sauvegarde', value: 'Automatique (Firebase)' },
      { name: 'Taille des données', value: '< 1 MB' }
    ]
  },
  {
    title: 'Sécurité',
    icon: Shield,
    description: 'Paramètres de sécurité et permissions',
    items: [
      { name: 'Authentification', value: 'Email + Mot de passe' },
      { name: 'Règles Firestore', value: 'Activées' },
      { name: 'Admins', value: '1 utilisateur' }
    ]
  }
];