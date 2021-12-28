export const capitalizeString = (string: string) => {
  return `${string[0].toUpperCase()}${string.slice(1)}`;
};

export const getMarkColor = (mark: number) => {
  if (mark >= 8) return "green";
  if (mark >= 5 && mark < 8) return "orange";
  return "red";
};
