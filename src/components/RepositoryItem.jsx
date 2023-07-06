import { View, StyleSheet, Image } from "react-native";
import * as Linking from "expo-linking";
import Text from "./Text";
import ButtonPrimary from "./ButtonPrimary";
import theme from "../theme";

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 10,
  },
  flexContainerTop: {
    flexDirection: "row",
  },
  flexContainerBottom: {
    marginTop: 20,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  itemTop: {
    alignItems: "flex-start",
    flexGrow: 1,
    paddingHorizontal: 15,
  },
  itemBottom: {
    width: 60,
    height: 40,
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  description: {
    paddingVertical: 10,
    flexDirection: "row",
  },
  language: {
    backgroundColor: theme.colors.primary,
    color: "white",
    padding: 5,
    borderRadius: 5,
  },
});

const RepositoryItem = ({ item, githubLink }) => {
  const parsedNumber = (number) => {
    const component =
      number >= 1000 ? (
        <Text fontWeight="bold">{(number / 1000).toFixed(1)}k</Text>
      ) : (
        <Text fontWeight="bold">{number}</Text>
      );
    return component;
  };

  return (
    <View testID="repositoryItem" style={styles.card}>
      <View style={styles.flexContainerTop}>
        <Image style={styles.image} source={{ uri: item.ownerAvatarUrl }} />
        <View style={styles.itemTop}>
          <Text fontWeight="bold" fontSize="subheading">
            {item.fullName}
          </Text>
          <View style={styles.description}>
            <Text color="textSecondary" style={{ flex: 1, flexWrap: "wrap" }}>
              {item.description}
            </Text>
          </View>
          <View style={styles.language}>
            <Text style={{ color: "white" }}>{item.language}</Text>
          </View>
        </View>
      </View>
      <View style={styles.flexContainerBottom}>
        <View style={styles.itemBottom}>
          {parsedNumber(item.stargazersCount)}
          <Text color="textSecondary">Stars</Text>
        </View>
        <View style={styles.itemBottom}>
          {parsedNumber(item.forksCount)}
          <Text color="textSecondary">Forks</Text>
        </View>
        <View style={styles.itemBottom}>
          <Text fontWeight="bold">{item.reviewCount}</Text>
          <Text color="textSecondary">Reviews</Text>
        </View>
        <View style={styles.itemBottom}>
          <Text fontWeight="bold">{item.ratingAverage}</Text>
          <Text color="textSecondary">Rating</Text>
        </View>
      </View>
      {githubLink ? (
        <ButtonPrimary
          text="Open in GitHub"
          handlePress={() => Linking.openURL(item.url)}
        />
      ) : (
        <></>
      )}
    </View>
  );
};

export default RepositoryItem;
