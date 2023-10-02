export default interface SettingsSection {
  enumeratedType: { [key: string]: string };
  legend: string;
  selectedValue: string;
  onChange: (value: string) => void;
}
