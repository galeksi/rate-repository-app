import { View, StyleSheet, FlatList, Pressable, Alert } from "react-native";
import ReviewItem from "./ReviewItem";
import { useQuery, useMutation } from "@apollo/client";
import { GET_CURRENT_USER, DELETE_REVIEW } from "../graphql/queries";
import Text from "./Text";
import theme from "../theme";
import { useNavigate } from "react-router-native";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  actionContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    alignSelf: "stretch",
  },
  repositoryButton: {
    backgroundColor: theme.colors.primary,
    flexGrow: 1,
    margin: 15,
    borderRadius: 5,
    paddingVertical: 20,
  },
  deleteButton: {
    backgroundColor: theme.colors.alert,
    flexGrow: 1,
    margin: 15,
    borderRadius: 5,
    paddingVertical: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
    // padding: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewList = () => {
  const navigate = useNavigate();
  const [destroy] = useMutation(DELETE_REVIEW);
  const { data, loading, refetch } = useQuery(GET_CURRENT_USER, {
    variables: {
      includeReviews: true,
    },
  });

  if (loading) {
    return <Text>Loading...</Text>;
  }

  const reviews = data.me.reviews.edges
    ? data.me.reviews.edges.map((edge) => edge.node)
    : [];

  const deleteReview = (id) => {
    destroy({
      variables: {
        deleteReviewId: id,
      },
    });

    refetch({
      includeReviews: true,
    });
  };

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => (
        <View>
          <ReviewItem review={item} />
          <View style={styles.actionContainer}>
            <Pressable
              style={styles.repositoryButton}
              onPress={() => navigate(`/${item.repositoryId}`)}
            >
              <Text style={styles.buttonText}>View repository</Text>
            </Pressable>
            <Pressable
              style={styles.deleteButton}
              onPress={() => {
                Alert.alert(
                  "Delete review",
                  "Are you shure you want to delete this review?",
                  [
                    {
                      text: "Cancel",
                      style: "cancel",
                    },
                    { text: "DELETE", onPress: () => deleteReview(item.id) },
                  ]
                );
              }}
            >
              <Text style={styles.buttonText}>Delete review</Text>
            </Pressable>
          </View>
        </View>
      )}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={({ id }) => id}
    />
  );
};

export default ReviewList;
