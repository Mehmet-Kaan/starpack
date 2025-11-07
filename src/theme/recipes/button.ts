import { defineRecipe } from "@chakra-ui/react";

export const buttonRecipe = defineRecipe({
  base: {
    borderRadius: "md",
  },
  variants: {
    size: {
      "2xl": {
        paddingLeft: "1.5rem",
        paddingRight: "1.5rem",
        height: "3.5rem",
        textStyle: "label/L/medium",
      },
      md: {
        textStyle: "label/M/medium",
      },
    },
    variant: {
      solid: {
        bg: "blacks.800",
        color: "white",
        _hover: { bg: "blacks.700" },
        _active: { bg: "blacks.900" },
      },
      outline: {
        bg: "transparent",
        color: "blacks.800",
        border: "1px solid",
        borderColor: "blacks.700",
        _hover: { bg: "blackAlpha.50" },
        _active: { bg: "blackAlpha.100" },
      },
      ghost: {
        bg: "transparent",
        color: "blacks.800",
        _hover: { bg: "blackAlpha.100" },
        _active: { bg: "blackAlpha.200" },
      },
      link: {
        bg: "transparent",
        color: "blacks.800",
        _hover: { textDecoration: "underline" },
        _active: { textDecoration: "underline" },
      },
      "display-primary": {
        bg: "blacks.900",
        color: "foreground.inverse",
        borderRadius: "full",
        _hover: {
          bg: "blacks.800",
        },
      },
      "display-secondary-peach": {
        bg: "peach",
        color: "foreground.primary",
        borderRadius: "full",
        border: "2px solid #FBD8CE",
        _hover: {
          bg: "peach.500",
        },
      },
      "display-outline": {
        bg: "transparent",
        color: "foreground.primary",
        borderRadius: "full",
        border: "2px solid",
        borderColor: "foreground.primary",
        _hover: {
          backgroundColor: "background.secondary",
        },
        _active: {
          backgroundColor: "background.tertiary",
        },
      },
      "display-ghost": {
        bg: "transparent",
        color: "foreground.primary",
        borderRadius: "full",
        _hover: {
          backgroundColor: "background.secondary",
        },
        _active: {
          backgroundColor: "background.tertiary",
        },
      },
      "display-link": {
        bg: "transparent",
        color: "foreground.primary",
        borderRadius: "full",
        _hover: {
          textDecoration: "underline",
        },
        _active: {
          textDecoration: "underline",
        },
      },
    },
  },
  defaultVariants: {
    variant: "solid",
    size: "md",
  },
});
