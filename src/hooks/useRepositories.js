import { useQuery } from "@apollo/client";
import { ALL_REPOSITORIES } from "../graphql/queries";

const useRepositories = () => {
  const { data, loading, refetch } = useQuery(ALL_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
  });

  return {
    repositories: loading ? undefined : data.repositories,
    loading,
    refetch,
  };
};

export default useRepositories;
