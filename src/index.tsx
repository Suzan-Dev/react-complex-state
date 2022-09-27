import { useState } from "react";

/**
 * Returns a stateful value, a function to update it and much more.
 */
const useComplexState = <T extends Partial<T>>(initialValue: T[]) => {
  const [complexState, setComplexState] = useState(initialValue);

  const insert = (data: T) => {
    setComplexState((prevState) => [...prevState, data]);
  };

  // const preInsert = (data: T) => {
  //   setComplexState((prevState) => [data, ...prevState]);
  // };

  const update = (data: T, index: number) => {
    if (complexState[index] === undefined) {
      return;
    }

    setComplexState((prevState) => {
      const newClonedComplexState = [...prevState];
      newClonedComplexState[index] = data;
      return newClonedComplexState;
    });
  };

  const remove = (index: number) => {
    if (complexState[index] === undefined) {
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
