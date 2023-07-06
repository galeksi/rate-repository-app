import { View, StyleSheet } from "react-native";
import Text from "./Text";
import theme from "../theme";
import { format } from "date-fns";

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "white",
    flexDirection: "row",
  },
  rating: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "space-around",
  },
  ratingText: {
    color: theme.colors.primary,
    fontWeight: "bold",
    fontSize: 18,
  },
  contentContainer: {
    flexGrow: 1,
    paddingLeft: 15,
  },
  date: {
    color: theme.colors.textSecondary,
    fontSize: 16,
    paddingTop: 5,
    paddingBottom: 10,
  },
  reviewContainer: {
    flexDirection: "row",
  },
  reviewText: {
    flex: 1,
    flexWrap: "wrap",
    letterSpacing: 1,
  },
});

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.container}>
      <View style={styles.rating}>
        <Text style={styles.ratingText}>{review.rating}</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text fontSize="subheading" fontWeight="bold">
          {review.user.username}
        </Text>
        <Text style={styles.date}>
          {format(new Date(review.createdAt), "dd.MM.yyyy")}
        </Text>
        <View style={styles.reviewContainer}>
          <Text style={styles.reviewText}>{review.text}</Text>
        </View>
      </View>
    </View>
  );
};

export default ReviewItem;
