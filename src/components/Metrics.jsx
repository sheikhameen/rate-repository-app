import { StyleSheet, View } from "react-native";
import Text from "./Text";

const Metrics = ({ counts }) => {
  return (
    <View style={styles.metricsContainer}>
      {counts.map((c) => (
        <MetricCount key={c.label} label={c.label} count={c.count} />
      ))}
    </View>
  );
};

const MetricCount = ({ label, count }) => {
  return (
    <View style={styles.metric}>
      <Text fontSize="subheading" fontWeight="bold">
        {formatToK(count)}
      </Text>
      <Text color="secondary" fontSize="subheading">
        {label}
      </Text>
    </View>
  );
};

function formatToK(number) {
  if (number >= 1000) {
    const formattedNumber = (number / 1000).toFixed(1);
    return parseFloat(formattedNumber) + "k";
  }
  return number.toString();
}

const styles = StyleSheet.create({
  metricsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },

  metric: {
    display: "flex",
    alignItems: "center",
    gap: 4,
  },
});

export default Metrics;
