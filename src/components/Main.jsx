import { Route, Routes, Navigate } from "react-router-native";
import SingleRepository from "./SingleRepository";
import { StyleSheet, View } from "react-native";
import RepositoryList from "./RepositoryList";
import ReviewPage from "./ReviewPage";
import MyReviews from "./MyReviews";
import SignOut from "./SignOut";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import AppBar from "./AppBar";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.mainBackground,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signOut" element={<SignOut />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/repositories/:id" element={<SingleRepository />} />
        <Route path="/review" element={<ReviewPage />} />
        <Route path="/my-reviews" element={<MyReviews />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;
