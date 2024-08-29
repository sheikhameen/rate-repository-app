import { FlatList, StyleSheet } from "react-native";
import { useParams } from "react-router-native";
import { format } from "date-fns";
import { useQuery } from "@apollo/client";
import { View } from "react-native";

import { GET_REPOSITORY } from "../graphql/queries";
import RepositoryItem from "./RepositoryItem";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  reviewContainer: {
    gap: 16,
    padding: 20,
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "row",
  },
  reviewRatingContainer: {
    borderColor: theme.colors.primary,
    borderWidth: 2,
    width: 40,
    height: 40,
    borderRadius: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  reviewDetailsContainer: {
    width: "100%",
    flexShrink: 1,
    gap: 4,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.reviewContainer}>
      <View style={styles.reviewRatingContainer}>
        <Text color="primary" fontSize="subheading" fontWeight="bold">
          {review.rating}
        </Text>
      </View>
      <View style={styles.reviewDetailsContainer}>
        <Text fontSize="heading" fontWeight="bold">
          {review.user.username}
        </Text>
        <Text color="secondary">{format(review.createdAt, "dd.MM.yyyy")}</Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  );
};

const SingleRepository = () => {
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_REPOSITORY, {
    fetchPolicy: "cache-and-network",
    variables: { repositoryId: id },
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const reviews = data.repository.reviews.edges.map((edge) => edge.node);

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={() => (
        <>
          <RepositoryItem repository={data.repository} showLink={true} />
          <ItemSeparator />
        </>
      )}
    />
  );
};

export default SingleRepository;
