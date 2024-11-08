import { FlatList, StyleSheet, View } from "react-native";
import { useQuery } from "@apollo/client";
import { format } from "date-fns";
import React from "react";

import { ME } from "../graphql/queries";
import theme from "../theme";
import Text from "./Text";

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

const MyReviews = () => {
  const { data, loading } = useQuery(ME, {
    variables: {
      includeReviews: true,
    },
  });

  if (loading || !data) return null;

  const reviews = data.me.reviews.edges.map((edge) => edge.node);

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default MyReviews;

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
          {review.repository.fullName}
        </Text>
        <Text color="secondary">{format(review.createdAt, "dd.MM.yyyy")}</Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  );
};
