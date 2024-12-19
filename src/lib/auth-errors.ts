export const AUTH_ERRORS = {
  'auth/user-not-found': 'Aucun compte n\'existe avec cet email',
  'auth/wrong-password': 'Mot de passe incorrect',
  'auth/email-already-in-use': 'Un compte existe déjà avec cet email',
  'auth/invalid-email': 'Format d\'email invalide',
  'auth/weak-password': 'Le mot de passe doit contenir au moins 6 caractères',
  'auth/network-request-failed': 'Problème de connexion internet',
  'auth/too-many-requests': 'Trop de tentatives, veuillez réessayer plus tard',
  'auth/user-disabled': 'Ce compte a été désactivé',
  'default': 'Une erreur est survenue lors de l\'authentification'
} as const;

export function getAuthErrorMessage(errorCode: string): string {
  return AUTH_ERRORS[errorCode as keyof typeof AUTH_ERRORS] || AUTH_ERRORS.default;
}