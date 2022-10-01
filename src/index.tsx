import { useState } from "react";
import cloneDeep from "./utils/cloneDeep";
import isInvalidOrNegativeIndex from "./utils/validateIndex";

/**
 * A custom hook that makes it easy when working with complex state. Only supports state that has an array type.
 */
export const useComplexState = <T extends Partial<T>>(initialValue: T[]) => {
  const [complexState, setComplexState] = useState(initialValue);

  const getFilteredData = (filter?: Partial<T>): T[] => {
    if (!filter) {
      return complexState;
    } else if (typeof filter !== "object") {
      return complexState.filter((item) => item === filter);
    } else {
      return complexState.filter((stateItem) => {
        const filterKeys = Object.keys(filter);
        const filterValues = Object.values(filter);

        const resultFilter = filterKeys.map(
          (_, index) =>
            `${stateItem[filterKeys[index]]}` === `${filterValues[index]}`
        );
        return Function("return " + resultFilter.join(" && "))();
      });
    }
  };

  const count = (filter?: Partial<T>): number => {
    return getFilteredData(filter).length;
  };

  const find = (filter?: Partial<T>): T[] => {
    return getFilteredData(filter);
  };

  const findOne = (filter: Partial<T>): T | null => {
    return getFilteredData(filter)[0] || null;
  };

  const insert = (data: T | T[], index: number = -1) => {
    if (isInvalidOrNegativeIndex(index, complexState)) {
      if (Array.isArray(data)) {
        setComplexState((prevState) => [...prevState, ...data]);
      } else {
        setComplexState((prevState) => [...prevState, data]);
      }
      return;
    }

    setComplexState((prevState) => {
      return prevState.slice(0, index).concat(data, prevState.slice(index));
    });
  };

  const insertMany = (data: T[], index: number = -1) => {
    insert(data, index);
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

  const partialUpdateMany = (data: Partial<T>, indexes: number[]) => {
    if (typeof data !== "object") {
      return;
    }

    const filteredValidIndexes = indexes.filter(
      (index) => !isInvalidOrNegativeIndex(index, complexState)
    );

    if (!filteredValidIndexes.length) {
      return;
    }

    setComplexState((prevState) => {
      const newClonedComplexState = cloneDeep(prevState);

      filteredValidIndexes.forEach((index) => {
        newClonedComplexState[index] = {
          ...newClonedComplexState[index],
          ...data,
        };
      });

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

  const removeMany = (indexes: number[]) => {
    const filteredValidIndexes = indexes.filter(
      (index) => !isInvalidOrNegativeIndex(index, complexState)
    );

    if (!filteredValidIndexes.length) {
      return;
    }

    setComplexState((prevState) => {
      return prevState.filter((_, idx) => !filteredValidIndexes.includes(idx));
    });
  };

  return {
    value: complexState,
    setValue: setComplexState,
    count,
    find,
    findOne,
    insert,
    insertMany,
    update,
    partialUpdate,
    partialUpdateMany,
    remove,
    removeMany,
  };
};
