import { useQuery } from "@apollo/client";
import { useParams } from "react-router-native";
import { GET_SINGLE_REPOSITORY } from "../graphql/queries";
import RepositoryItem from "./RepositoryItem";
import { Text } from "react-native";

const RepositoryView = () => {
  const { id } = useParams();

  const { data, loading } = useQuery(GET_SINGLE_REPOSITORY, {
    variables: { repositoryId: id },
  });

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return <RepositoryItem item={data.repository} githubLink={true} />;
};

export default RepositoryView;
