const sansStack =
  'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
const monoStack =
  'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace';

export const fontSans = {
  style: {
    fontFamily: sansStack,
  },
  variable: "--font-sans",
};

export const fontMono = {
  style: {
    fontFamily: monoStack,
  },
  variable: "--font-mono",
};
