import { View, StyleSheet, Pressable } from "react-native";
import Constants from "expo-constants";
import AppBarTab from "./AppBarTab";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBar,
    display: "flex",
    flexDirection: "row",
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <AppBarTab label="Repositories" path="/" />
      <AppBarTab label="Sign In" path="/signIn" />
    </View>
  );
};

export default AppBar;
