import { Pressable } from "react-native";
import { Link } from "react-router-native";
// import theme from "../theme";
import Text from "./Text";

const AppBarItem = ({ link, name }) => {
  return (
    <Pressable style={{ paddingHorizontal: 10, paddingVertical: 15 }}>
      <Link to={link}>
        <Text
          fontWeight="bold"
          fontSize="subheading"
          style={{ color: "white" }}
        >
          {name}
        </Text>
      </Link>
    </Pressable>
  );
};

export default AppBarItem;
