export const createCircularStatefulGenerator = <T extends string>(
  elements: T[]
): ((currentState: T) => T) => {
  const mapping: Record<string, T> = {};

  elements.forEach((elem, index) => {
    if (index === elements.length - 1) {
      mapping[elem] = elements[0];

      return;
    }

    mapping[elem] = elements[index + 1];
  });

  return (currentState: T) => mapping[currentState];
};
