export const truncateString=(input: string, maxLength: number): string => {
    if (input.length > maxLength) {
      return `${input.substring(0, maxLength - 3)}...`;
    }
    return input;
  }