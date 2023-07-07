import { Pressable } from "react-native";
import { Link } from "react-router-native";
import Text from "./Text";

const AppBarItem = ({ link, name, styling }) => {
  return (
    <Pressable style={styling}>
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
