import { Pressable, StyleSheet } from "react-native";
import Text from "./Text";

const AppBarTab = ({ label }) => {
  return (
    <Pressable style={styles.container}>
      <Text fontSize="heading" fontWeight="bold" style={styles.text}>
        {label}
      </Text>
    </Pressable>
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
