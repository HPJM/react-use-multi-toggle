# `useMultiToggle`

This is a hook to manage multiple boolean states. For example, showing multiple checkboxes or keeping track of whether multiple dropdowns are open.

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
  const { toggle, add, remove, has } = useMultiToggle([1, 2, 3]);

  return (
    <div>
      {has(1) && <p>1</p>}
      {has(2) && <p>2</p>}
      {has(100) && <p>100</p>}
      <button onClick={() => actions.toggle(1)}>Toggle 1</button>
      <button onClick={() => actions.add(100)}>Add 100</button>
      <button onClick={() => actions.remove(2)}>Remove 2</button>
    </div>
  );
};
```

## Reference

```ts
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
- `set<T>(T[]): void` - directly calls `useState` setter;
- `has<T>(T): void` - indicates element is in state;
- `hasSome<T>(T[]): void` - indicates some elements are in state;
- `hasAll<T>(T[]): void` - indicates all elements are in state;
- `values: T[]` - all elements in state;
