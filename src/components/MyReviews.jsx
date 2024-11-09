import { Alert, FlatList, StyleSheet, View } from "react-native";
import { useMutation, useQuery } from "@apollo/client";
import { format } from "date-fns";
import React from "react";

import { ME } from "../graphql/queries";
import theme from "../theme";
import Text from "./Text";
import Button from "./Button";
import { useNavigate } from "react-router-native";
import { DELETE_REVIEW } from "../graphql/mutations";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  reviewContainer: {
    backgroundColor: "#fff",
    gap: 20,
    padding: 20,
  },
  reviewInfo: {
    gap: 16,
    flexDirection: "row",
  },
  reviewActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  reviewRatingContainer: {
    borderColor: theme.colors.primary,
    borderWidth: 2,
    width: 40,
    height: 40,
    borderRadius: 20,
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
  const { data, loading, refetch } = useQuery(ME, {
    variables: {
      includeReviews: true,
    },
    fetchPolicy: "no-cache",
  });

  const [deleteReview] = useMutation(DELETE_REVIEW, {
    onCompleted: refetch,
  });

  if (loading || !data) return null;

  const reviews = data.me.reviews.edges.map((edge) => edge.node);

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => (
        <ReviewItem
          review={item}
          deleteReview={(id) =>
            deleteReview({
              variables: {
                deleteReviewId: id,
              },
            })
          }
        />
      )}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default MyReviews;

const ReviewItem = ({ review, deleteReview }) => {
  const navigate = useNavigate();

  return (
    <View style={styles.reviewContainer}>
      <View style={styles.reviewInfo}>
        <View style={styles.reviewRatingContainer}>
          <Text color="primary" fontSize="subheading" fontWeight="bold">
            {review.rating}
          </Text>
        </View>
        <View style={styles.reviewDetailsContainer}>
          <Text fontSize="heading" fontWeight="bold">
            {review.repository.fullName}
          </Text>
          <Text color="secondary">
            {format(review.createdAt, "dd.MM.yyyy")}
          </Text>
          <Text>{review.text}</Text>
        </View>
      </View>
      <View style={styles.reviewActions}>
        <Button
          onPress={() => navigate(`/repositories/${review.repository.id}`)}
        >
          View repository
        </Button>
        <Button
          onPress={() =>
            Alert.alert(
              "Delete review",
              "Are you sure you want to delete this review?",
              [
                { text: "Cancel" },
                {
                  text: "Delete",
                  onPress: () => {
                    deleteReview(review.id);
                  },
                },
              ]
            )
          }
          variant="destructive"
        >
          Delete review
        </Button>
      </View>
    </View>
  );
};
