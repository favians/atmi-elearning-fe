import { tv } from "tailwind-variants";

export const title = tv({
  base: "tracking-tight  font-bold",
  variants: {
    color: {
      white: "text-white",
      black: "text-black",
      primary: "text-primary",
      blue: "text-blue",
    },
    size: {
      sm: "text-3xl leading-[2.7rem]",
      md: "text-4xl leading-[3rem]",
      lg: "text-5xl leading-[2rem]",
    },
  },
  defaultVariants: {
    size: "md",
    color: "black",
  },
});

export const headline = tv({
  base: "font-semibold",
  variants: {
    color: {
      white: "text-white",
      black: "text-black",
      primary: "text-primary",
      blue: "text-blue",
    },
    size: {
      sm: "text-xl",
      md: "text-2xl",
      lg: "text-3xl",
    },
  },
  defaultVariants: {
    size: "md",
    color: "black",
  },
});

export const subtitle = tv({
  base: "font-light",
  variants: {
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    },
    color: {
      white: "text-white",
      red: "text-danger",
      black: "text-black",
      grey: "text-grey-900",
      primary: "text-primary",
      orange: "text-orange-bricks",
    },
  },
  defaultVariants: {
    size: "md",
    color: "black",
  },
});

export const subteks = tv({
  base: "font-medium",
  variants: {
    size: {
      md: "text-xs",
      lg: "text-sm",
    },
    color: {
      white: "text-white",
      red: "text-danger",
      black: "text-black",
      grey: "text-grey-900",
      primary: "text-primary",
      orange: "text-orange-bricks",
    },
  },
  defaultVariants: {
    size: "md",
    color: "black",
  },
});
