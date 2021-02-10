import React from "react";
import { useMultiToggle } from "../src";
import "@testing-library/jest-dom";

import { render, fireEvent } from "@testing-library/react";

const TestComponent = () => {
  const ids = [1, 2, 3];
  const {
    has,
    hasSome,
    hasAll,
    values,
    set,
    add,
    remove,
    toggle,
  } = useMultiToggle<number>(ids);
  return (
    <div>
      {has(1) && <p>1</p>}
      {values.includes(2) && <p>2</p>}
      {has(3) && <p>3</p>}
      {has(4) && <p>4</p>}
      {has(5) && <p>5</p>}
      {has(6) && <p>6</p>}
      {hasSome([1, 7]) && <p>Has some: 1, 7</p>}
      {hasAll([1, 2]) && <p>Has all: 1, 2</p>}
      {hasAll([100, 2]) && <p>Has all: 100, 2</p>}
      <button onClick={() => toggle(3)}>Toggle 3</button>
      <button onClick={() => remove(3)}>Remove 3</button>
      <button onClick={() => add(4)}>Add 4</button>
      <button onClick={() => add([5, 6])}>Add 5 and 6</button>
      <button onClick={() => remove([1, 2])}>Remove 1 and 2</button>
      <button onClick={() => set((values) => [...values, 5, 6])}>
        Set 5 and 6
      </button>
    </div>
  );
};

describe("multi toggle", () => {
  test("has indicates items in state", () => {
    const { queryByText } = render(<TestComponent />);
    expect(queryByText("1")).toBeInTheDocument();
    expect(queryByText("2")).toBeInTheDocument();
    expect(queryByText("3")).toBeInTheDocument();
    expect(queryByText("Has all: 1, 2")).toBeInTheDocument();
    expect(queryByText("Has some: 1, 7")).toBeInTheDocument();
    expect(queryByText("4")).not.toBeInTheDocument();
    expect(queryByText("5")).not.toBeInTheDocument();
    expect(queryByText("6")).not.toBeInTheDocument();
    expect(queryByText("Has all: 100, 2")).not.toBeInTheDocument();
  });
  test("hasSome", () => {
    const { queryByText } = render(<TestComponent />);
    expect(queryByText("Has some: 1, 7")).toBeInTheDocument();
  });
  test("hasAll", () => {
    const { queryByText } = render(<TestComponent />);
    expect(queryByText("Has all: 1, 2")).toBeInTheDocument();
    expect(queryByText("Has all: 100, 2")).not.toBeInTheDocument();
  });
  test("toggle", () => {
    const { queryByText } = render(<TestComponent />);
    const toggle = queryByText("Toggle 3");
    expect(queryByText("3")).toBeInTheDocument();
    fireEvent.click(toggle);
    expect(queryByText("3")).not.toBeInTheDocument();
    fireEvent.click(toggle);
    expect(queryByText("3")).toBeInTheDocument();
  });
  test("remove", () => {
    const { queryByText } = render(<TestComponent />);
    const remove = queryByText("Remove 3");
    expect(queryByText("3")).toBeInTheDocument();
    fireEvent.click(remove);
    expect(queryByText("3")).not.toBeInTheDocument();
  });
  test("remove many", () => {
    const { queryByText } = render(<TestComponent />);
    const remove = queryByText("Remove 1 and 2");
    expect(queryByText("1")).toBeInTheDocument();
    expect(queryByText("2")).toBeInTheDocument();
    fireEvent.click(remove);
    expect(queryByText("1")).not.toBeInTheDocument();
    expect(queryByText("2")).not.toBeInTheDocument();
  });
  test("add", () => {
    const { queryByText } = render(<TestComponent />);
    const add = queryByText("Add 4");
    expect(queryByText("4")).not.toBeInTheDocument();
    fireEvent.click(add);
    expect(queryByText("4")).toBeInTheDocument();
  });
  test("add many", () => {
    const { queryByText } = render(<TestComponent />);
    const add = queryByText("Add 5 and 6");
    expect(queryByText("5")).not.toBeInTheDocument();
    expect(queryByText("6")).not.toBeInTheDocument();
    fireEvent.click(add);
    expect(queryByText("5")).toBeInTheDocument();
    expect(queryByText("6")).toBeInTheDocument();
  });
  test("set", () => {
    const { queryByText } = render(<TestComponent />);
    expect(queryByText("5")).not.toBeInTheDocument();
    expect(queryByText("6")).not.toBeInTheDocument();
    const set = queryByText("Set 5 and 6");
    fireEvent.click(set);
    expect(queryByText("5")).toBeInTheDocument();
    expect(queryByText("6")).toBeInTheDocument();
  });
});
