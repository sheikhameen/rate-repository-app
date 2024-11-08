import { Picker } from "@react-native-picker/picker";
import { FlatList, View, StyleSheet, Pressable } from "react-native";

import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import { useNavigate } from "react-router-native";
import { useState } from "react";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({
  repositories,
  sortBy,
  setSortBy,
}) => {
  const navigate = useNavigate();
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={
        <Picker
          selectedValue={sortBy}
          onValueChange={(itemValue) => setSortBy(itemValue)}
        >
          <Picker.Item label="Latest repositories" value="latest" />
          <Picker.Item label="Highest rated repositories" value="highest" />
          <Picker.Item label="Lowest rated repositories" value="lowest" />
        </Picker>
      }
      renderItem={({ item }) => (
        <Pressable onPress={() => navigate(`/repositories/${item.id}`)}>
          <RepositoryItem repository={item} />
        </Pressable>
      )}
    />
  );
};

const RepositoryList = () => {
  const [sortBy, setSortBy] = useState("latest");

  const { repositories } = useRepositories({
    orderBy: sortBy === "latest" ? "CREATED_AT" : "RATING_AVERAGE",
    orderDirection: sortBy === "lowest" ? "ASC" : "DESC",
  });

  return (
    <RepositoryListContainer
      repositories={repositories}
      sortBy={sortBy}
      setSortBy={setSortBy}
    />
  );
};

export default RepositoryList;
