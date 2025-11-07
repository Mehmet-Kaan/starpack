import { defineTextStyles } from "@chakra-ui/react";

export const fonts = {
  display: { value: "'Playfair Display', serif" },
  brand: { value: "'Baloo Bhai 2', sans-serif" },
  heading: { value: "'Poppins', sans-serif" },
  label: { value: "'Poppins', sans-serif" },
  body: { value: "Inter, sans-serif" },
};

export const fontSizes = {
  xs: { value: "0.625rem" }, // 10px
  sm: { value: "0.75rem" }, // 12px
  md: { value: "0.875rem" }, // 14px
  lg: { value: "1rem" }, // 16px
  xl: { value: "1.125rem" }, // 18px
  "2xl": { value: "1.25rem" }, // 20px
  "3xl": { value: "1.5rem" }, // 24px
  "3.5xl": { value: "1.75rem" }, // 28px
  "4xl": { value: "2.25rem" }, // 36px
  "5xl": { value: "3rem" }, // 48px
  "6xl": { value: "4.375rem" }, // 70px
  "7xl": { value: "5.25rem" }, // 84px
  "icon-xs": { value: "0.875rem" }, // 14px
  "icon-sm": { value: "1rem" }, // 16px
  "icon-md": { value: "1.25rem" }, // 20px
  "icon-lg": { value: "1.25rem" }, // 20px
};

export const fontWeights = {
  regular: { value: 400 },
  medium: { value: 500 },
  semibold: { value: 600 },
  bold: { value: 700 },
};

export const textStyles = defineTextStyles({
  brand: {
    value: {
      fontFamily: "brand",
      fontSize: "4xl",
      fontWeight: "500",
    },
  },
  "heading/display/L": {
    value: {
      fontFamily: "display",
      fontWeight: "600",
      fontSize: ["5xl", "5xl", "5xl", "6xl"],
      lineHeight: "120%",
    },
  },
  "heading/display/M": {
    value: {
      fontFamily: "display",
      fontWeight: "400",
      fontSize: ["4xl", "5xl"],
      lineHeight: "120%",
    },
  },
  "heading/display/S": {
    value: {
      fontFamily: "display",
      fontWeight: "400",
      fontSize: ["3xl", "4xl"],
      lineHeight: "120%",
    },
  },
  "heading/XL": {
    value: {
      fontFamily: "heading",
      fontSize: "5xl",
      fontWeight: "500",
      lineHeight: "120%",
    },
  },
  "heading/L": {
    value: {
      fontFamily: "heading",
      fontSize: "4xl",
      fontWeight: "500",
      lineHeight: "110%",
    },
  },
  "heading/M": {
    value: {
      fontFamily: "heading",
      fontSize: "3xl",
      fontWeight: "500",
      lineHeight: "120%",
    },
  },
  "heading/S": {
    value: {
      fontFamily: "heading",
      fontSize: "2xl",
      fontWeight: "500",
      lineHeight: "120%",
    },
  },
  "label/XL/regular": {
    value: {
      fontFamily: "label",
      fontSize: "2xl",
      fontWeight: "400",
      lineHeight: "150%",
      letterSpacing: "0.16px",
    },
  },
  "label/L/regular": {
    value: {
      fontFamily: "label",
      fontSize: "lg",
      fontWeight: "400",
      lineHeight: "20px",
      letterSpacing: "0.16px",
    },
  },
  "label/L/medium": {
    value: {
      fontFamily: "label",
      fontSize: "lg",
      fontWeight: "500",
      lineHeight: "20px",
      letterSpacing: "0.16px",
    },
  },
  "label/L/medium/underline": {
    value: {
      textDecoration: "underline",
      fontFamily: "label",
      fontSize: "lg",
      fontWeight: "500",
      lineHeight: "20px",
      letterSpacing: "0.16px",
    },
  },
  "label/L/medium/uppercase": {
    value: {
      letterSpacing: "0.089rem",
      fontFamily: "label",
      fontWeight: "600",
      fontSize: "lg",
      lineHeight: "150%",
      textTransform: "uppercase",
      color: "foreground.secondary",
    },
  },
  "label/M/regular": {
    value: {
      fontFamily: "label",
      fontSize: "md",
      fontWeight: "400",
      lineHeight: "150%",
      letterSpacing: "0.14px",
    },
  },
  "label/M/regular/underline": {
    value: {
      fontFamily: "label",
      fontSize: "md",
      fontWeight: "400",
      lineHeight: "150%",
      textDecoration: "underline",
      letterSpacing: "0.14px",
    },
  },
  "label/M/medium": {
    value: {
      fontFamily: "label",
      fontSize: "md",
      fontWeight: "500",
      lineHeight: "150%",
      letterSpacing: "0.14px",
    },
  },
  "label/S/regular": {
    value: {
      fontFamily: "label",
      fontSize: "sm",
      fontWeight: "400",
      lineHeight: "150%",
      letterSpacing: "0.12px",
    },
  },
  "label/S/medium": {
    value: {
      fontFamily: "label",
      fontSize: "sm",
      fontWeight: "500",
      lineHeight: "150%",
      letterSpacing: "0.12px",
    },
  },
  "label/S/italic": {
    value: {
      fontFamily: "label",
      fontSize: "sm",
      fontWeight: "400",
      lineHeight: "150%",
      letterSpacing: "0.12px",
      fontStyle: "italic",
    },
  },
  "label/XS": {
    value: {
      fontFamily: "label",
      fontSize: "xs",
      fontWeight: "400",
      lineHeight: "150%",
      letterSpacing: "0.1px",
    },
  },
  "paragraph/M/regular": {
    value: {
      fontFamily: "body",
      fontSize: "md",
      fontWeight: "400",
      lineHeight: "171%",
      letterSpacing: "0.14px",
    },
  },
  "paragraph/M/medium": {
    value: {
      fontFamily: "body",
      fontSize: "md",
      fontWeight: "500",
      lineHeight: "171%",
      letterSpacing: "0.14px",
    },
  },
  "paragraph/L/regular": {
    value: {
      fontFamily: "body",
      fontSize: "lg",
      fontWeight: "400",
      lineHeight: "150%",
      letterSpacing: "0.14px",
    },
  },
  "paragraph/L/medium": {
    value: {
      fontFamily: "body",
      fontSize: "lg",
      fontWeight: "500",
      lineHeight: "150%",
      letterSpacing: "0.14px",
    },
  },
  "paragraph/XL/regular": {
    value: {
      fontFamily: "body",
      fontWeight: "400",
      lineHeight: "150%",
      fontSize: ["xl", "2xl"],
      color: "foreground.primary",
      letterSpacing: "0.14px",
    },
  },
  "paragraph/XL/medium": {
    value: {
      fontFamily: "body",
      fontWeight: "500",
      lineHeight: "150%",
      fontSize: ["xl", "2xl"],
      color: "foreground.primary",
      letterSpacing: "0.14px",
    },
  },
} as any);
