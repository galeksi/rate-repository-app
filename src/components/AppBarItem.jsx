import { Pressable } from "react-native";
// import theme from "../theme";
import Text from "./Text";

const AppBarItem = () => {
  return (
    <Pressable style={{ paddingHorizontal: 10, paddingVertical: 15 }}>
      <Text fontWeight="bold" fontSize="subheading" style={{ color: "white" }}>
        Repositories
      </Text>
    </Pressable>
  );
};

export default AppBarItem;
