import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import config from "react-native-config";
import { url } from "./src/config/env";
import axios from "axios";
import CustomModal from "./src/components/Modal";
import { ActivityIndicator } from "react-native";

type UserObj = {
  id: number;
  name: string;
  phone: string;
  email: string;
  website: string;
};

export default function App() {
  const [users, setUsers] = useState<UserObj[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserObj | null>(null);
  const [loading,setLoading] = useState(false);
  // example Data
  //   {{
  //   "address": {
  //     "city": "Gwenborough",
  //     "geo": [
  //       Object
  //     ],
  //     "street": "Kulas Light",
  //     "suite": "Apt. 556",
  //     "zipcode": "92998-3874"
  //   },
  //   "company": {
  //     "bs": "harness real-time e-markets",
  //     "catchPhrase": "Multi-layered client-server neural-net",
  //     "name": "Romaguera-Crona"
  //   },
  //   "email": "Sincere@april.biz",
  //   "id": 1,
  //   "name": "Leanne Graham",
  //   "phone": "1-770-736-8031 x56442",
  //   "username": "Bret",
  //   "website": "hildegard.org"
  // }}

  const getData = async () => {
    setLoading(true);
    try {
      const res = await axios.get<UserObj[]>(`${url}/users`);

      setUsers(res.data);
    } catch (error) {
      console.error("error", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleUserPress = (user: UserObj) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedUser(null);
  };

  if(loading){
    return(
      <ActivityIndicator size={"small"}/>
    )
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          height: "30%",
          backgroundColor: "orange",
          width: "100%",
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
          marginVertical: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "black", fontSize: 18, fontWeight: "500" }}>
          Hey this is Employee Details Apps..
        </Text>
        <Text style={{ color: "black", fontSize: 18, fontWeight: "800" }}>
          User's-List
        </Text>
      </View>
      <ScrollView
        style={{ width: "100%" }}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
        showsVerticalScrollIndicator={false}
      >
        {users.map((user) => {
          return (
            <TouchableOpacity
              onPress={() => handleUserPress(user)}
              key={user.id}
              style={{
                height: 50,
                margin: 10,
                width: "100%",
                justifyContent:"center",
                alignItems: "center",
                borderRadius: 10,
                backgroundColor: "lightblue",
              }}
            >
              <Text style={{ color: "black", fontWeight: "400" }}>
                {user.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <CustomModal
        user={selectedUser}
        visible={modalVisible}
        onClose={handleCloseModal}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
});
