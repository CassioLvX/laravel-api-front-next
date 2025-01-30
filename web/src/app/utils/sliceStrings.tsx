export default function sliceString(text: string, maxLength: number = 140): string {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + '...';
  };
