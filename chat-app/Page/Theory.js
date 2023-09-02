import {
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  Image,
} from "react-native";
import { useEffect, useState } from "react";
import { theoriesData } from "../Data/data";
import { Calculator } from "./Calculator";

export const Theory = ({ backToHome }) => {
  const [theories, setTheories] = useState(theoriesData);
  const [value, setValue] = useState("");
  const [selectedTheory, setSelectedTheory] = useState(false);
  const findTheory = (e) => {
    const inputValue = e.nativeEvent.text;
    setValue(inputValue);
    if (inputValue === "") {
      setTheories(theoriesData);
    } else {
      // ทำการมองหาตัวที่มีอยู่ใน name includes คือการมองหาคำที่มีอยู่ในนั้น เช่น red มี ['r', 'e', 'd'] จะมองในลักษณะนี้ ถ้ามี a ก็ถือว่ามีอยู่
      const filtered = theories.filter((item) =>
        item.name.includes(inputValue)
      );
      setTheories(filtered);
    }
  };

  const theoryHandle = (item) => {
    const filterTheory = theoriesData.filter((theory) => theory.name === item);
    setTheories(filterTheory);
    setSelectedTheory(true);
  };

  const handleBack = () => {
    setTheories(theoriesData);
    setSelectedTheory(false);
  };

  return (
    <ScrollView>
      {selectedTheory ? (
        <Calculator data={theories} handleBack={handleBack} />
      ) : (
        <>
          {Platform.OS === "android" ? (
            <View style={styles.homeButtonContainer}>
              <TouchableOpacity onPress={backToHome} style={{backgroundColor: 'black'}}>
                <Text style={{ color: 'white', fontSize: 20, textAlign: 'center'}}>Back</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              onPress={backToHome}
              style={styles.homeButtonContainer}
            >
              <Text style={styles.homeButton}>&lt;</Text>
            </TouchableOpacity>
          )}
          <View style={{ position: "relative" }}>
            <TextInput
              placeholder="Search"
              style={styles.theorySearch}
              onChange={findTheory}
              value={value}
            />
            <TouchableOpacity
              style={{
                position: "absolute",
                top: Platform.OS === "ios" ? 63 : 61,
                right: Platform.OS === "ios" ? 90 : 70,
              }}
              onPress={() => {
                setValue("");
                setTheories(theoriesData);
              }}
            >
              <Text style={{ fontWeight: "700", fontSize: 20 }}>X</Text>
            </TouchableOpacity>
          </View>
          {theories.map((item, index) => {
            return (
              <View style={styles.theoryContainer} key={index}>
                <TouchableOpacity
                  onPress={() => {
                    theoryHandle(item.name);
                  }}
                >
                  <Text style={styles.theoryText}>{item.name}</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  theoryContainer: {
    padding: 10,
    backgroundColor: "#ccc",
    borderRadius: 5,
    margin: 5,
  },
  theoryText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: 'center'
  },
  theorySearch: {
    padding: Platform.OS === "android" ? 10 : 50,
    borderRadius: 50,
    width: Platform.OS === 'android' ? '70%' : '80%',
    padding: 10,
    backgroundColor: "#ccc",
    borderRadius: 50,
    marginTop: 50,
    alignSelf: "center",
    marginBottom: 20,
    height: 50,
    marginLeft: Platform.OS === 'android' ? 20 : 0
  },
  homeButtonContainer: {
    position: "absolute",
    top: Platform.OS === 'android' ? 63 : 35,
    left: 10,
    zIndex: 100,
  },
  homeButton: {
    fontSize: 60,
    fontWeight: "700",
  },
});
