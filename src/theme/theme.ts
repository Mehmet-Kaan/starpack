import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";
import { globalCss } from "./global";
import { colors } from "./primitives/colors";
import { fonts, fontSizes, fontWeights, textStyles } from "./primitives/fonts";
import { radii, spacing } from "./primitives/sizes";
import { buttonRecipe } from "./recipes/button";
import { badgeRecipe } from "./recipes/badge";
import { semanticColors } from "./tokens/colors";
import { popoverRecipe } from "./recipes/popover";
import { borders } from "./tokens/borders";

const config = defineConfig({
  globalCss,
  theme: {
    textStyles,
    recipes: {
      button: buttonRecipe,
      badge: badgeRecipe,
      popover: popoverRecipe,
    },
    tokens: {
      fonts,
      fontSizes,
      fontWeights,
      colors,
      spacing,
      radii,
    },
    semanticTokens: {
      colors: semanticColors,
      borders,
    },
  },
});

export default createSystem(defaultConfig, config);
