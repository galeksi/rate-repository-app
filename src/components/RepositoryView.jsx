import { useQuery } from "@apollo/client";
import { useParams } from "react-router-native";
import { GET_SINGLE_REPOSITORY } from "../graphql/queries";
import { Text, View, StyleSheet, FlatList } from "react-native";
import RepositoryItem from "./RepositoryItem";
import ReviewItem from "./ReviewItem";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryView = () => {
  const { id } = useParams();

  const { data, loading } = useQuery(GET_SINGLE_REPOSITORY, {
    fetchPolicy: "cache-and-network",
    variables: { repositoryId: id },
  });

  if (loading) {
    return <Text>Loading...</Text>;
  }

  const reviews = data.repository.reviews.edges
    ? data.repository.reviews.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => (
        <>
          <RepositoryItem item={data.repository} githubLink={true} />
          <ItemSeparator />
        </>
      )}
    />
  );
};

export default RepositoryView;
