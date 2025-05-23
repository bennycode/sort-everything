import os from 'node:os';

export const StringUtil = {
  applyIndent: (text: string, indent: number) => {
    const spaces = ' '.repeat(indent);
    let indented = '';

    if (indent > 0) {
      indented = text
        .split(/\r?\n/)
        .map(line => (line.length > 0 ? spaces + line : line))
        .join(os.EOL);
    }

    return indented ? indented : text;
  },
  countLeadingWhitespaces: (text: string) => {
    const match = text.match(/^\s*/);
    return match ? match[0].length : 0;
  },
  endsWithNewline: (text: string) => {
    return /\r?\n$/.test(text);
  },
};
