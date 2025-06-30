import React, { useEffect, useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

type userprops = {
  id: number;
  name: string;
  phone: string;
  email: string;
  website: string;
};

type CustomModalProps = {
  user: userprops | null;
  visible: boolean;
  onClose: () => void;
};

const DropdownItems = [
  { key: "profile", label: "Profile" },
  { key: "contacts", label: "Contacts" },
];

const CustomModal: React.FC<CustomModalProps> = ({
  user,
  visible,
  onClose,
}) => {
  const [selected, setSelected] = useState("profile");
  const [dropdownVisible, setDropdownVisible] = useState(false);

//   console.log(visible);
//   console.log(user);

  useEffect(() => {
    setSelected("profile");
    setDropdownVisible(false);
  }, [visible, user]);

  if (!user) return null;

  const renderContent = () => {
    if (selected === "profile") {
      return (
        <View>
          <Text style={styles.contentText}>🙋‍♂️{" "}{user.name}</Text>
          <Text style={styles.contentText}>📞{" "}{user.phone}</Text>
        </View>
      );
    } else if (selected === "contacts") {
      return (
        <View>
          <Text style={styles.contentText}>💼{" "}{user.email}</Text>
          <Text style={styles.contentText}>💻{" "}{user.website}</Text>
        </View>
      );
    }
    return null;
  };

  return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
        style={styles.centeredView}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={styles.dropdownTrigger}
              onPress={() => setDropdownVisible(!dropdownVisible)}
            >
              <Text style={styles.dropdownText}>
                {DropdownItems.find((item) => item.key === selected)?.label}
              </Text>
            </TouchableOpacity>

            {dropdownVisible && (
              <View style={styles.dropdownMenu}>
                {DropdownItems.map((item) => (
                  <TouchableOpacity
                    key={item.key}
                    style={[
                      styles.dropdownItem,
                      selected === item.key && styles.dropdownItemSelected,
                    ]}
                    onPress={() => {
                      setSelected(item.key);
                      setDropdownVisible(false);
                    }}
                  >
                    <Text
                      style={[
                        styles.dropdownItemText,
                        selected === item.key &&
                          styles.dropdownItemTextSelected,
                      ]}
                    >
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            <View style={styles.contentContainer}>{renderContent()}</View>

            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={onClose}
            >
              <Text style={styles.textStyle}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    minWidth: 250,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 10,
    minWidth: 120,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  dropdownTrigger: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    minWidth: 150,
    alignItems: "center",
  },
  dropdownText: {
    fontSize: 16,
    color: "#333",
  },
  dropdownMenu: {
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    width: 150,
    zIndex: 1,
  },
  dropdownItem: {
    padding: 10,
  },
  dropdownItemSelected: {
    backgroundColor: "#e0e0e0",
  },
  dropdownItemText: {
    fontSize: 16,
    color: "#333",
  },
  dropdownItemTextSelected: {
    fontWeight: "bold",
    color: "#2196F3",
  },
  contentContainer: {
    marginVertical: 20,
    alignItems: "center",
  },
  contentText: {
    fontSize: 16,
    color: "#444",
  },
});

export default CustomModal;
