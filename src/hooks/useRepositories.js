import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = (order, direction) => {
  const { data, loading, error, refetch } = useQuery(GET_REPOSITORIES, {
    variables: {
      orderBy: order,
      orderDirection: direction,
    },

    fetchPolicy: "cache-and-network",
  });

  return { data, loading, error, refetch };
};

export default useRepositories;
