import { TextInput as NativeTextInput, StyleSheet } from "react-native";

import theme from "../theme";
const styles = StyleSheet.create({
  input: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal,
    flexGrow: 1,
    padding: 15,
    marginHorizontal: 10,
    marginTop: 10,
    borderRadius: 5,
    borderStyle: "solid",
    borderColor: theme.colors.textSecondary,
    borderWidth: 1,
  },
  inputAlert: {
    borderColor: theme.colors.alert,
  },
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [styles.input, error && styles.inputAlert, style];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;
