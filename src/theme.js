import { Platform } from "react-native";

const theme = {
  colors: {
    textPrimary: "#24292e",
    textSecondary: "#586069",
    textMuted: "#84878c",
    appBar: "#24292e",
    mainBackground: "#e1e4e8",
    border: "#a8aeb5",
    primary: "#0366d6",
    danger: "#d73a4a",
  },
  fontSizes: {
    body: 14,
    subheading: 16,
    heading: 20,
  },
  fonts: {
    main: Platform.select({
      android: "Roboto",
      ios: "Arial",
      default: "System",
    }),
  },
  fontWeights: {
    normal: "400",
    bold: "700",
  },
};

export default theme;
