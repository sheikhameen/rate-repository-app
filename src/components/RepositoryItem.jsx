import { View, Image, StyleSheet, Pressable } from "react-native";
import { useParams } from "react-router-native";
import { useQuery } from "@apollo/client";
import * as Linking from "expo-linking";

import { GET_REPOSITORY } from "../graphql/queries";
import Metrics from "./Metrics";
import theme from "../theme";
import Text from "./Text";

const RepositoryItem = ({ repository, showLink }) => {
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_REPOSITORY, {
    skip: !id,
    variables: { repositoryId: id },
  });

  const repo = id ? data?.repository : repository;

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <View testID="repositoryItem" style={styles.container}>
      <View style={styles.avatarAndDetails}>
        <Image style={styles.avatar} source={{ uri: repo.ownerAvatarUrl }} />
        <View style={styles.details}>
          <Text fontSize="heading" fontWeight="bold">
            {repo.fullName}
          </Text>
          <Text color="secondary">{repo.description}</Text>
          <Text style={styles.languageTag}>{repo.language}</Text>
        </View>
      </View>
      <Metrics
        counts={[
          { label: "Stars", count: repo.stargazersCount },
          { label: "Forks", count: repo.forksCount },
          { label: "Reviews", count: repo.reviewCount },
          { label: "Rating", count: repo.ratingAverage },
        ]}
      />
      {showLink && (
        <Pressable
          style={styles.linkButton}
          onPress={() => Linking.openURL(repo.url)}
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
