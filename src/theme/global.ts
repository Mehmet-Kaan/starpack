export const globalCss = {
  ":root": {
    "--focus-border": "#007fd4",
    "--separator-border": "transparent",
  },
  "::selection": {
    background: "{colors.background.highlight}",
  },
  html: {
    height: "100%",
    scrollbarWidth: "none", // Firefox
  },
  body: {
    height: "100%",
    fontFamily: "{fonts.body}",
    fontWeight: "400",
    fontSize: "{fontSizes.md}",
    borderColor: "{colors.border.primary}",
    color: "{colors.text.primary}",
    overflowY: "auto",
    overflowX: "hidden",
    position: "relative",
  },
  "body::before": {
    content: '""',
    position: "fixed",
    inset: "0",
    background:
      "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO8WQ8AAtIBENW3TcMAAAAASUVORK5CYII=') repeat",
    opacity: 0.05,
    animation: "noiseMove 1s steps(10) infinite",
    pointerEvents: "none",
    zIndex: 1,
  },
  "@keyframes noiseMove": {
    to: { transform: "translate(1%, 1%)" },
  },

  /* Hide scrollbar but keep scroll active */
  "::-webkit-scrollbar": {
    width: "0px",
    height: "0px",
  },
};
