import { View, Pressable, StyleSheet, ScrollView } from "react-native";
import { useQuery, useApolloClient } from "@apollo/client";
import { useAuthStorage } from "../hooks/useAuthStorage";
import { USER_SIGNOUT } from "../graphql/queries";
import Text from "./Text";
import Constants from "expo-constants";
import theme from "../theme";
import AppBarItem from "./AppBarItem";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.backgroundDark,
  },
  item: {
    flexGrow: 0,
  },
  pressable: {
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
});

const AppBar = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const { data } = useQuery(USER_SIGNOUT);

  const logOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  };

  const user =
    data && data.me ? (
      <Pressable style={styles.pressable} onPress={logOut}>
        <Text
          fontWeight="bold"
          fontSize="subheading"
          style={{ color: "white" }}
        >
          Sign out
        </Text>
      </Pressable>
    ) : (
      <AppBarItem
        style={styles.item}
        link="/signin"
        name="Sign in"
        styling={styles.pressable}
      />
    );

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarItem
          style={styles.item}
          link="/"
          name="Repositories"
          styling={styles.pressable}
        />
        {user}
      </ScrollView>
    </View>
  );
};

export default AppBar;
