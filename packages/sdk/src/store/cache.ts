export interface ICache<T> {
  delete(key: string): void;
  has(key: string): boolean;
  get(key: string): T | undefined;
  getEntries(): Record<string, T>;
  set(key: string, entry: T): void;
  setEntries(entries: Record<string, T>): void;
  clear(): void;
}
