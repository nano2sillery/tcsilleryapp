export interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  gender: 'M' | 'F';
  phoneNumber: string;
  fftRanking: string;
}