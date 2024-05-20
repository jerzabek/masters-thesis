export interface Action<K, T> {
  type: K
  payload: T
}
