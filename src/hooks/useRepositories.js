import { useQuery } from "@apollo/client";
import { ALL_REPOSITORIES } from "../graphql/queries";

const useRepositories = (variables) => {
  const { data, loading, fetchMore, ...result } = useQuery(ALL_REPOSITORIES, {
    variables,
    fetchPolicy: "cache-and-network",
  });

  const handleFetchMore = () => {
    // Check if data not loading and that the response has a next page
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    // If not return
    if (!canFetchMore) {
      return;
    }

    // If yes, the use the fetchMore function, with the `after` variable, passing it the last endCursor, and any other variables.
    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return {
    repositories: data?.repositories,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

export default useRepositories;
