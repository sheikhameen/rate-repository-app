import { StyleSheet } from "react-native";
import Text from "./Text";
import { Link } from "react-router-native";

const AppBarTab = ({ label, path }) => {
  return (
    <Link style={styles.container} to={path}>
      <Text fontSize="heading" fontWeight="bold" style={styles.text}>
        {label}
      </Text>
    </Link>
  );
};

export default AppBarTab;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  text: {
    color: "#fff",
  },
});
