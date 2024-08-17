import { View, Text } from "react-native";
import React from "react";

const RepositoryItem = ({ repository }) => {
  return (
    <View>
      <Text>Full Name: {repository.fullName}</Text>
      <Text>Description: {repository.description}</Text>
      <Text>Language: {repository.language}</Text>
      <Text>Stars: {repository.forksCount}</Text>
      <Text>Forks: {repository.stargazersCount}</Text>
      <Text>Reviews: {repository.reviewCount}</Text>
      <Text>Rating: {repository.ratingAverage}</Text>
    </View>
  );
};

export default RepositoryItem;
