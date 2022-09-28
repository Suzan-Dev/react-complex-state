import { useState } from "react";
import cloneDeep from "./utils/cloneDeep";
import isInvalidOrNegativeIndex from "./utils/validateIndex";

/**
 * A custom hook that makes it easy when working with complex state. Only supports state that has an array type.
 */
const useComplexState = <T extends Partial<T>>(initialValue: T[]) => {
  const [complexState, setComplexState] = useState(initialValue);

  const insert = (data: T, index: number = -1) => {
    if (isInvalidOrNegativeIndex(index, complexState)) {
      setComplexState((prevState) => [...prevState, data]);
      return;
    }

    setComplexState((prevState) => {
      return prevState.slice(0, index).concat(data, prevState.slice(index));
    });
  };

  const update = (data: T, index: number) => {
    if (isInvalidOrNegativeIndex(index, complexState)) {
      return;
    }

    setComplexState((prevState) => {
      const newClonedComplexState = [...prevState];
      newClonedComplexState[index] = data;
      return newClonedComplexState;
    });
  };

  const partialUpdate = (data: Partial<T>, index: number) => {
    // To make sure that this function is only used when the state contains array of objects
    if (typeof data !== "object") {
      return;
    }

    if (isInvalidOrNegativeIndex(index, complexState)) {
      return;
    }

    setComplexState((prevState) => {
      const newClonedComplexState = cloneDeep(prevState);
      newClonedComplexState[index] = {
        ...newClonedComplexState[index],
        ...data,
      };
      return newClonedComplexState;
    });
  };

  const remove = (index: number) => {
    if (isInvalidOrNegativeIndex(index, complexState)) {
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
    partialUpdate,
    remove,
  };
};

export default useComplexState;
