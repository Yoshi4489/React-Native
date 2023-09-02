import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  Platform,
} from "react-native";

export const Event = ({ makeEvent }) => {
  const [text, setText] = useState('')
  function getText() {
    if (!text) {
      alert("Your task can't be empty")
    }
    else makeEvent(true, text)
  }
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>Add Task</Text>
        <View
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            flexDirection: 'row'
          }}
        >
          <Text style={{fontSize: 18, fontWeight: '400'}}>Task</Text>
          <Text style={{color: 'gray'}}>required</Text>
        </View>
        <TextInput
          style={styles.input}
          numberOfLines={10}
          multiline={true}
          placeholder="Description"
          value={text}
          onChangeText={setText}
        ></TextInput>
        <View style={styles.btnContainers}>
          <View style={styles.btnContainer}>
            <Button
              title="Cancel"
              color={Platform.OS === "android" ? null : "white"}
              onPress={() => makeEvent(false)}
            ></Button>
          </View>
          <View style={styles.btnContainer}>
            <Button
              title="Submit"
              color={Platform.OS === "android" ? null : "white"}
              onPress={getText}
            ></Button>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "70%",
    marginTop: 50,
    backgroundColor: "white",
    left: Platform.OS === "android" ? "20%" : "15%",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    top: Platform.OS === "android" ? -40 : "30%",
  },
  btnContainer: {
    width: "45%",
    backgroundColor: "#4499e5",
    borderRadius: 5,
  },
  btnContainers: {
    display: "flex",
    flexDirection: "row",
    justifyContent: 'space-between'
  },
  text: {
    fontSize: 20,
    fontWeight: "700",
  },
  input: {
    borderRadius: 5,
    borderColor: "gray",
    borderWidth: 2,
    borderStyle: "solid",
    paddingLeft: Platform.OS === "android" ? 10 : 20,
    marginTop: 5,
    marginBottom: 10,
    height: Platform.OS === "android" ? 200 : 100,
    textAlignVertical: "top",
    paddingTop: 10,
    fontSize: 15,
  },
});
