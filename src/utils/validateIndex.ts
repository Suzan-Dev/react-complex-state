const isInvalidOrNegativeIndex = <T>(index: number, array: T): boolean => {
  if (array[index] === undefined || index < 0) {
    return true;
  } else {
    return false;
  }
};

export default isInvalidOrNegativeIndex;
