export type XOR<T, U> = T | U extends object
  ? (Without<T, U> & U) | (Without<U, T> & T)
  : T | U;

// eslint-disable-next-line no-unused-vars
export type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };
