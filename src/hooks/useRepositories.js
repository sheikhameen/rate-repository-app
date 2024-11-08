import { useQuery } from "@apollo/client";
import { ALL_REPOSITORIES } from "../graphql/queries";

const useRepositories = ({ orderBy, orderDirection, searchKeyword }) => {
  const { data, loading, refetch } = useQuery(ALL_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    variables: {
      orderBy: orderBy || "CREATED_AT",
      orderDirection: orderDirection || "DESC",
      searchKeyword: searchKeyword || "",
    },
  });

  return {
    repositories: data?.repositories,
    loading,
    refetch,
  };
};

export default useRepositories;
