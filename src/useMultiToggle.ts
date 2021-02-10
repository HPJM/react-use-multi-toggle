import { useState } from "react";

type OneOrMany<T> = T | T[];

export interface MultiToggleActions<T> {
  has: (value: OneOrMany<T>) => boolean;
  hasSome: (value: T[]) => boolean;
  hasAll: (value: T[]) => boolean;
  add: (value: OneOrMany<T>) => void;
  remove: (value: OneOrMany<T>) => void;
  toggle: (value: T) => void;
  set: React.Dispatch<React.SetStateAction<T[]>>;
  values: T[];
}

const add = <T>(values: T[], value: OneOrMany<T>): T[] => {
  if (Array.isArray(value)) {
    return [...values, ...value];
  }
  return [...values, value];
};

const remove = <T>(values: T[], value: OneOrMany<T>): T[] => {
  if (Array.isArray(value)) {
    return values.filter((val) => !value.includes(val));
  }
  return values.filter((val) => val !== value);
};

const has = <T>(values: T[], value: T): boolean => values.includes(value);

const hasSome = <T>(values: T[], list: T[]): boolean =>
  list.some((val) => values.includes(val));

const hasAll = <T>(values: T[], list: T[]): boolean =>
  list.every((val) => values.includes(val));

export const useMultiToggle = <T>(initial: T[] = []): MultiToggleActions<T> => {
  const [values, setValues] = useState<T[]>(initial);

  return {
    values,
    has: (value: T) => has(values, value),
    hasSome: (list: T[]) => hasSome(values, list),
    hasAll: (list: T[]) => hasAll(values, list),
    set: setValues,
    add: (value: OneOrMany<T>): void =>
      setValues((values) => add(values, value)),
    remove: (value: OneOrMany<T>): void =>
      setValues((values) => remove(values, value)),
    toggle: (value: T): void =>
      setValues((values) =>
        values.includes(value) ? remove(values, value) : add(values, value)
      ),
  };
};
