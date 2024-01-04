import { ICache } from "./cache";

export class InMemoryCache<T> implements ICache<T> {
  constructor(private cache: Map<string, T> = new Map()) {}
  delete(key: string): void {
    this.cache.delete(key);
  }
  has(key: string): boolean {
    return this.cache.has(key);
  }
  get(key: string): T | undefined {
    return this.cache.get(key);
  }
  getEntries(): Record<string, T> {
    return Object.fromEntries(this.cache.entries());
  }
  set(key: string, entry: T): void {
    this.cache.set(key, entry);
  }
  setEntries(entries: Record<string, T>): void {
    for (const [key, entry] of Object.entries(entries)) {
      this.set(key, entry);
    }
  }
  clear(): void {
    this.cache.clear();
  }
}
