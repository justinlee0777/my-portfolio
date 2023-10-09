export default interface SwitchProps {
  className?: string;
  value?: boolean;
  onChange?: (toggled: boolean) => void;
}
