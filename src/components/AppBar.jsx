import { View, StyleSheet } from "react-native";
import Constants from "expo-constants";
import theme from "../theme";
import AppBarItem from "./AppBarItem";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flexDirection: "row",
    backgroundColor: theme.colors.backgroundDark,
  },
  item: {
    flexGrow: 0,
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <AppBarItem style={styles.item} />
    </View>
  );
};

export default AppBar;
