import { defineRecipe } from "@chakra-ui/react";

export const badgeRecipe = defineRecipe({
  base: {
    borderRadius: "full",
    textStyle: "label/S/medium",
  },
  variants: {
    variant: {
      solid: {
        bg: "primary.600",
        color: "white",
      },
      subtle: {
        bg: "primary.100",
        color: "primary.800",
      },
      outline: {
        border: "1px solid",
        borderColor: "primary.600",
        color: "primary.700",
        bg: "transparent",
      },
    },
  },
  defaultVariants: {
    variant: "subtle",
  },
});


