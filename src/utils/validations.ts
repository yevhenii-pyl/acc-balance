export const validateKey = (key: string): string => {
  return key.length === 36 ? "" : "Key should be 36 characters long";
};
