import { render, screen, within } from "@testing-library/react-native";
import { describe, expect, it } from "@jest/globals";
import { RepositoryListContainer } from "../../components/RepositoryList";
import formatToK from "../../utils/formatToK";

describe("RepositoryList", () => {
  describe("RepositoryListContainer", () => {
    it("renders repository information correctly", () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          startCursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
        },
        edges: [
          {
            node: {
              id: "jaredpalmer.formik",
              fullName: "jaredpalmer/formik",
              description: "Build forms in React, without the tears",
              language: "TypeScript",
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars2.githubusercontent.com/u/4060187?v=4",
            },
            cursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
          },
          {
            node: {
              id: "async-library.react-async",
              fullName: "async-library/react-async",
              description: "Flexible promise-based React data loader",
              language: "JavaScript",
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars1.githubusercontent.com/u/54310907?v=4",
            },
            cursor:
              "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          },
        ],
      };

      render(<RepositoryListContainer repositories={repositories} />);
      const repositoryItems = screen.getAllByTestId("repositoryItem");
      const [firstRepositoryItem, secondRepositoryItem] = repositoryItems;

      // firstRepositoryItem
      expect(firstRepositoryItem).toHaveTextContent(
        repositories.edges[0].node.fullName
      );
      expect(firstRepositoryItem).toHaveTextContent(
        repositories.edges[0].node.description
      );
      expect(firstRepositoryItem).toHaveTextContent(
        repositories.edges[0].node.language
      );
      expect(
        within(firstRepositoryItem).getByTestId("metric-Stars")
      ).toHaveTextContent(
        formatToK(repositories.edges[0].node.stargazersCount)
      );
      expect(
        within(firstRepositoryItem).getByTestId("metric-Forks")
      ).toHaveTextContent(formatToK(repositories.edges[0].node.forksCount));
      expect(
        within(firstRepositoryItem).getByTestId("metric-Reviews")
      ).toHaveTextContent(formatToK(repositories.edges[0].node.reviewCount));
      expect(
        within(firstRepositoryItem).getByTestId("metric-Rating")
      ).toHaveTextContent(formatToK(repositories.edges[0].node.ratingAverage));

      // secondRepositoryItem
      expect(secondRepositoryItem).toHaveTextContent(
        repositories.edges[1].node.fullName
      );
      expect(secondRepositoryItem).toHaveTextContent(
        repositories.edges[1].node.description
      );
      expect(secondRepositoryItem).toHaveTextContent(
        repositories.edges[1].node.language
      );
      expect(
        within(secondRepositoryItem).getByTestId("metric-Stars")
      ).toHaveTextContent(
        formatToK(repositories.edges[1].node.stargazersCount)
      );
      expect(
        within(secondRepositoryItem).getByTestId("metric-Forks")
      ).toHaveTextContent(formatToK(repositories.edges[1].node.forksCount));
      expect(
        within(secondRepositoryItem).getByTestId("metric-Reviews")
      ).toHaveTextContent(formatToK(repositories.edges[1].node.reviewCount));
      expect(
        within(secondRepositoryItem).getByTestId("metric-Rating")
      ).toHaveTextContent(formatToK(repositories.edges[1].node.ratingAverage));
    });
  });
});
