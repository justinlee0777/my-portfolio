import NavigationLink from './navigation-link.interface';

export default interface NavigationProps {
  locale: string;
  links: Array<NavigationLink>;
  className?: string;
}
