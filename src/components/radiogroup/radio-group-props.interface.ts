import RadioGroupOption from './radio-group-option.interface';

export default interface RadioGroupProps {
  className?: string;
  legend: string;
  name: string;
  options: Array<RadioGroupOption>;
  selectedOption: string;
  onSelect: (value: string) => void;
}
