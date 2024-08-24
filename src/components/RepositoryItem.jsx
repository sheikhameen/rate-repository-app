import { View, Image, StyleSheet, Pressable } from "react-native";
import * as Linking from "expo-linking";
import Metrics from "./Metrics";
import theme from "../theme";
import Text from "./Text";

const RepositoryItem = ({ repository, showLink }) => {
  return (
    <View testID="repositoryItem" style={styles.container}>
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
      {showLink && (
        <Pressable
          style={styles.linkButton}
          onPress={() => Linking.openURL(repository.url)}
        >
          <Text
            style={styles.linkButtonText}
            fontWeight="bold"
            fontSize="subheading"
          >
            Open in GitHub
          </Text>
        </Pressable>
      )}
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
  linkButton: {
    backgroundColor: theme.colors.primary,
    padding: 16,
    borderRadius: 6,
  },
  linkButtonText: {
    textAlign: "center",
    color: "#fff",
  },
});

export default RepositoryItem;
