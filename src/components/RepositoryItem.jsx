import { View, Image, StyleSheet } from "react-native";
import Text from "./Text";
import theme from "../theme";
import Metrics from "./Metrics";

const RepositoryItem = ({ repository }) => {
  return (
    <View style={styles.container}>
      <View style={styles.avatarAndDetails}>
        <Image
          style={styles.avatar}
          source={{ uri: repository.ownerAvatarUrl }}
        />
        <View style={styles.details}>
          <Text fontSize="heading" fontWeight="bold">
            {repository.fullName}
          </Text>
          <Text color="secondary">{repository.description}</Text>
          <Text style={styles.languageTag}>{repository.language}</Text>
        </View>
      </View>
      <Metrics
        counts={[
          { label: "Stars", count: repository.stargazersCount },
          { label: "Forks", count: repository.forksCount },
          { label: "Reviews", count: repository.reviewCount },
          { label: "Rating", count: repository.ratingAverage },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    gap: 16,
    padding: 20,
    backgroundColor: "#fff",
  },
  avatarAndDetails: {
    display: "flex",
    flexDirection: "row",
    gap: 16,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 6,
  },
  details: {
    width: "100%",
    flexShrink: 1,
    gap: 4,
  },
  languageTag: {
    backgroundColor: theme.colors.primary,
    padding: 6,
    color: "#fff",
    alignSelf: "flex-start",
    borderRadius: 6,
  },
});

export default RepositoryItem;
