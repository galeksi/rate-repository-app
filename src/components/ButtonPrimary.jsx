import { Pressable, StyleSheet } from "react-native";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  btnPrimary: {
    flexGrow: 1,
    padding: 15,
    margin: 10,
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
  },
  btnPrimaryText: {
    color: "white",
    textAlign: "center",
  },
});

const ButtonPrimary = ({ text, handlePress }) => {
  return (
    <Pressable style={styles.btnPrimary} onPress={handlePress}>
      <Text
        fontSize="subheading"
        fontWeight="bold"
        style={styles.btnPrimaryText}
      >
        {text}
      </Text>
    </Pressable>
  );
};

export default ButtonPrimary;
