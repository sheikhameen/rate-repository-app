import { StyleSheet, View } from "react-native";
import Text from "./Text";
import formatToK from "../utils/formatToK";

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
    <View style={styles.metric} testID={`metric-${label}`}>
      <Text fontSize="subheading" fontWeight="bold">
        {formatToK(count)}
      </Text>
      <Text color="secondary" fontSize="subheading">
        {label}
      </Text>
    </View>
  );
};

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
