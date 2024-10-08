/**
 * Should move this to components
 */
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export default PartialBy;
