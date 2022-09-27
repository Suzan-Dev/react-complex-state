import { useState } from "react";

/**
 * Returns a stateful value, a function to update it and much more.
 */
const useComplexState = <T extends Partial<T>>(initialValue: T[]) => {
  const [complexState, setComplexState] = useState(initialValue);

  const insert = (data: T, index: number = -1) => {
    if (complexState[index] === undefined || index < 0) {
      setComplexState((prevState) => [...prevState, data]);
      return;
    }

    setComplexState((prevState) => {
      return prevState.slice(0, index).concat(data, prevState.slice(index));
    });
  };

  const update = (data: T, index: number) => {
    if (complexState[index] === undefined || index < 0) {
      return;
    }

    setComplexState((prevState) => {
      const newClonedComplexState = [...prevState];
      newClonedComplexState[index] = data;
      return newClonedComplexState;
    });
  };

  const remove = (index: number) => {
    if (complexState[index] === undefined || index < 0) {
      return;
    }

    setComplexState((prevState) => {
      return prevState.slice(0, index).concat(prevState.slice(index + 1));
    });
  };

  return {
    value: complexState,
    setValue: setComplexState,
    insert,
    update,
    remove,
  };
};

export default useComplexState;
