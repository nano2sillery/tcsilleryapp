export type TitleVariant = 'default' | 'primary';

export interface PageTitleProps {
  children: React.ReactNode;
  subtitle?: string;
  variant?: TitleVariant;
  className?: string;
}