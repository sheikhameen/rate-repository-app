import { View, StyleSheet, Pressable, ScrollView } from "react-native";
import Constants from "expo-constants";
import AppBarTab from "./AppBarTab";
import theme from "../theme";
import { useQuery } from "@apollo/client";
import { ME } from "../graphql/queries";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBar,
  },
});

const AppBar = () => {
  const { data, loading } = useQuery(ME);

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab label="Repositories" path="/" />
        {!loading && data.me ? (
          <AppBarTab label="Sign Out" path="/signOut" />
        ) : (
          <AppBarTab label="Sign In" path="/signIn" />
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
