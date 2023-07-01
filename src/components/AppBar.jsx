import { View, StyleSheet, ScrollView } from "react-native";
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
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarItem style={styles.item} link="/" name="Repositories" />
        <AppBarItem style={styles.item} link="/signin" name="Signin" />
      </ScrollView>
    </View>
  );
};

export default AppBar;
