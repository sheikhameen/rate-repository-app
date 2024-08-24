import React from "react";
import { useParams } from "react-router-native";
import { useQuery } from "@apollo/client";
import RepositoryItem from "./RepositoryItem";
import { GET_REPOSITORY } from "../graphql/queries";
import Text from "./Text";

const RepositoryInfo = () => {
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_REPOSITORY, {
    variables: { repositoryId: id },
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return <RepositoryItem repository={data.repository} showLink={true} />;
};

export default RepositoryInfo;
