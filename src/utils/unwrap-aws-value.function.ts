export default function unwrapAWSValue(v: { [key: string]: any }): any {
  const newValue = Object.values(v).at(0);

  if (Array.isArray(newValue)) {
    return newValue.map(unwrapAWSValue);
  } else if (typeof newValue === 'object') {
    return Object.fromEntries(
      Object.entries(newValue).map(([key, value]) => [
        key,
        unwrapAWSValue(value as any),
      ])
    );
  } else {
    return newValue;
  }
}
