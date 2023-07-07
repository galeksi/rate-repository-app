import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { FlatList, View, StyleSheet, Pressable, Modal } from "react-native";
import Text from "./Text";
import theme from "../theme";
import { Picker } from "@react-native-picker/picker";
import { useNavigate } from "react-router-native";

import useRepositories from "../hooks/useRepositories";
import RepositoryItem from "./RepositoryItem";

const styles = StyleSheet.create({
  separator: {
    height: 15,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalText: {
    // marginBottom: 15,
    textAlign: "center",
    color: theme.colors.textSecondary,
    fontSize: 18,
  },
  picker: { width: 300, height: 175 },
  orderPressable: {
    height: 75,
    flexDirection: "row",
  },
  orderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    paddingHorizontal: 15,
  },
  orderText: {
    fontSize: 18,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryList = () => {
  const { data, loading, refetch } = useRepositories("CREATED_AT", "DESC");
  const [order, setOrder] = useState("latest");
  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();

  const orderLabels = {
    latest: "Latest repositories",
    highest: "Highest rated repositories",
    lowest: "Lowest rated repositories",
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  const repositoryNodes = data.repositories
    ? data.repositories.edges.map((edge) => edge.node)
    : [];

  const changeOrder = async (orderValue) => {
    const queryVariables = {
      latest: {
        orderBy: "CREATED_AT",
        orderDirection: "DESC",
      },
      highest: {
        orderBy: "RATING_AVERAGE",
        orderDirection: "DESC",
      },
      lowest: {
        orderBy: "RATING_AVERAGE",
        orderDirection: "ASC",
      },
    };

    await refetch(queryVariables[orderValue]);
    setOrder(orderValue);
    setModalVisible(false);
  };

  const listHeader = (
    <View style={styles.centeredView}>
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalBackground}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Order by:</Text>
              <Picker
                style={styles.picker}
                itemStyle={{ height: 150 }}
                selectedValue={order}
                onValueChange={(itemValue) => changeOrder(itemValue)}
              >
                <Picker.Item label={orderLabels.latest} value="latest" />
                <Picker.Item label={orderLabels.highest} value="highest" />
                <Picker.Item label={orderLabels.lowest} value="lowest" />
              </Picker>
            </View>
          </View>
        </View>
      </Modal>
      <Pressable
        style={styles.orderPressable}
        onPress={() => setModalVisible(true)}
      >
        <View style={styles.orderContainer}>
          <Text style={styles.orderText}>{orderLabels[order]}</Text>

          <AntDesign
            name="caretdown"
            size={18}
            color={theme.colors.textPrimary}
          />
        </View>
      </Pressable>
    </View>
  );

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <Pressable onPress={() => navigate(`/${item.id}`)}>
          <RepositoryItem item={item} />
        </Pressable>
      )}
      ListHeaderComponent={() => listHeader}
    />
  );
};

// const RepositoryList = () => {
//   const { data, loading } = useRepositories();

//   if (loading) {
//     return <Text>Loading...</Text>;
//   }

//   return <RepositoryListContainer repositories={data.repositories} />;
// };

export default RepositoryList;
