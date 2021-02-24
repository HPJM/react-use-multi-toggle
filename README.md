# `useMultiToggle`

This is a hook to manage multiple boolean states. For example, showing multiple checkboxes or keeping track of whether multiple dropdowns are open.

## Installation

`npm i react-use-multi-toggle`

or

`yarn add react-use-multi-toggle`

## Usage

Initial state defaults to an empty array. If you are using typescript you can specify the type of item:

```tsx
import { useMultiToggle } from "react-use-multi-toggle";

const YourComponent = () => {
  const actions = useMultiToggle<number>([1, 2, 3]);
};
```

Here is how some of the actions can be used:

```jsx
import { useMultiToggle } from "react-use-multi-toggle";

const YourComponent = () => {
  const {
    toggle,
    add,
    remove,
    has,
    hasAll,
    hasSome,
    set,
    values,
  } = useMultiToggle([1, 2, 3]);

  return (
    <div>
      {has(1) && <p>Has 1</p>}
      {hasSome([1, 100]) && <p>Has 1 OR 100</p>}
      {hasAll([1, 2]) && <p>Has 1 AND 2</p>}
      <button onClick={() => toggle(1)}>Toggle 1</button>
      <button onClick={() => add(100)}>Add 100</button>
      <button onClick={() => remove(2)}>Remove 2</button>
      <button onClick={() => set([3, 5, 7])}>Replace</button>
      <p>Values: {values.map(String).join(", ")}</p>
    </div>
  );
};
```

## Reference

```js
const {
  toggle,
  add,
  remove,
  has,
  hasSome,
  hasAll,
  set,
  values,
} = useMultiToggle();
```

- `add<T>(T | T[]): void` - adds one or many elements;
- `remove<T>(T | T[]): void` - removes one or many elements;
- `toggle<T>(T): void` - inverts state of element: either adds or removes it;
- `set<T>(T[]): void` - sets given values;
- `has<T>(T): boolean` - whether given element is in state;
- `hasSome<T>(T[]): boolean` - whether some elements are in state;
- `hasAll<T>(T[]): boolean` - whether all elements are in state;
- `values: T[]` - all elements in state;
