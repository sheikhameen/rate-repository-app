import { View, StyleSheet, ScrollView } from "react-native";
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

  const loggedIn = !loading && data?.me;

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab label="Repositories" path="/" />
        {loggedIn ? (
          <>
            <AppBarTab label="Create a review" path="/review" />
            <AppBarTab label="Sign Out" path="/signOut" />
          </>
        ) : (
          <>
            <AppBarTab label="Sign in" path="/signIn" />
            <AppBarTab label="Sign up" path="/signUp" />
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
