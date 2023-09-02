import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  Platform,
  TouchableOpacity,
  Text,
} from "react-native";
import calendar from "../src/calendar.png";
import note from "../src/note.png";
import messageBox from "../src/chatbot.png";
import physic from "../src/physic.jpg";

const { width, height } = Dimensions.get("screen");
export const Home = ({ closeHome }) => {
  const selectedCatagories = (catagory) => {
    closeHome(catagory);
  };
  return (
    <View style={styles.homeContainer}>
      <View style={styles.itemsContainer}>
        <TouchableOpacity
          onPress={
            () =>selectedCatagories("calendar")
          }
          style={styles.imageContainer}
        >
          <Image
            source={calendar}
            style={styles.itemImage}
            resizeMode="contain"
          />
          <Text style={styles.text}>Calendar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={
            () =>
              selectedCatagories("note")
          }
          style={styles.imageContainer}
        >
          <Image source={note} style={styles.itemImage} resizeMode="contain" />
          <Text style={styles.text}>Note</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.itemsContainer}>
        <TouchableOpacity
          onPress={() => selectedCatagories("chat")}
          style={styles.imageContainer}
        >
          <Image
            source={messageBox}
            style={styles.itemImage}
            resizeMode="contain"
          />
          <Text style={styles.text}>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => selectedCatagories("theory")}
          style={styles.imageContainer}
        >
          <Image
            source={physic}
            style={styles.itemImage}
            resizeMode="contain"
          />
          <Text style={styles.text}>Physic Calculator</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  homeContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: Platform.OS === "android" ? 0 : 30,
    paddingBottom: 20,
  },
  itemsContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginTop: Platform.OS === "android" ? 30 : 50,
  },
  imageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: width / (Platform.OS === "android" ? 3.2 : 3.2),
    height: height / (Platform.OS === "android" ? 3 : 3.5),
    borderRadius: 20,
    backgroundColor: "white",
    // android
    elevation: 5,
    // ios
    shadowColor: "black",
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  itemImage: {
    width: "70%",
    height: "70%",
  },
  text: {
    fontSize: Platform.OS === "android" ? 16 : 22,
    fontWeight: "700",
    color: "black",
    textAlign: "center",
  },
});
