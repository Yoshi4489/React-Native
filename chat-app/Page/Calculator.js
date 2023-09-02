import { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Platform,
  TextInput,
  Button,
} from "react-native";

export const Calculator = ({ data, handleBack }) => {
  const [forCalculate, setForCalculate] = useState([]);
  const [theory, setTheory] = useState(data);
  const [calculate, setCalculate] = useState(false);
  const [input, setInput] = useState([
    { id: "input0", inputValue: "" },
    { id: "input1", inputValue: "" },
    { id: "input2", inputValue: "" },
    { id: "input3", inputValue: "" },
    { id: "input4", inputValue: "" },
    { id: "input5", inputValue: "" },
  ]);
  const [val, setVal] = useState("");
  const [selectedTheory, setSelectedTheory] = useState("");
  const handleClick = () => {
    handleBack();
  };

  const updateTheory = (item) => {
    let updatedTheory = {
      ...theory[0],
      all: item,
    };
    setTheory([updatedTheory]);
    setCalculate(true);
  };

  const selectedHandle = (item) => {
    const allTheory = theory[0]["all"];
    let filterTheory = allTheory.filter((items) => items === item);
    filterTheory = filterTheory.toString().split(" ");
    setSelectedTheory(allTheory.filter((i) => i === item));
    setForCalculate(filterTheory);
    setVal(filterTheory[0]);
    filterTheory[0] = "";
    const len = filterTheory.length;
    for (let index = 0; index < len; index++) {
      const char = filterTheory[index];
      if (!/[a-zA-Z]/.test(char)) {
        filterTheory = filterTheory.filter(
          (chars) => chars !== char && chars.length <= 2 && chars !== "*"
        );
      }
    }
    updateTheory(filterTheory);
  };

  const handleAllInput = (id, value, name) => {
    if (value === "") {
      input[id].id = "input";
    } else {
      input[id].inputValue = value;
      input[id].id = name;
    }
  };

  const calculateFunction = () => {
    const filteredInput = input.filter(
      (item) => item.id.length >= 1 && item.id.length <= 2
    );
    checkInput(filteredInput);
  };

  const checkInput = (data) => {
    if (data.length < theory[0].all.length) {
      alert("กรุณากรอกข้อมูลให้ครบทุกตัวก่อนคำนวณ");
    } else {
      data.map((item) => {
        if (isNaN(item.inputValue)) {
          alert("Not a number " + item.id);
        }
      });
      calculateVal(data);
    }
  };

  const calculateVal = (data) => {
    const allVariables = [];
    let calculating = "";
    data.map((item) => {
      allVariables.push({ value: item.inputValue, name: item.id });
    });
    for (let index = 0; index < forCalculate.length; index++) {
      allVariables.map((item, i) => {
        if (forCalculate[index] === item.name) {
          forCalculate[index] = item.value;
        }
      });
    }
    forCalculate.map((i) => {
      calculating += i;
    });
    alert(eval(calculating));
    handleBack();
  };

  return (
    <SafeAreaView>
      {Platform.OS === "android" ? (
          <View style={styles.backBtn}>
            <TouchableOpacity onPress={handleClick} style={{backgroundColor: 'black'}}>
              <Text style={{ color: 'white', fontSize: 20, textAlign: 'center'}}>Back</Text>
            </TouchableOpacity>
          </View>
      ) : (
        <TouchableOpacity onPress={handleClick}>
          <Text style={styles.backText}>&lt;</Text>
        </TouchableOpacity>
      )}
      {theory.map((items) => {
        return (
          <View>
            <Text style={styles.theoryTitle}>{items.name}</Text>
            <Text style={{ fontSize: 30, marginBottom: 10 }}>
              {selectedTheory.toString().split(" ")}
            </Text>
            {calculate ? (
              <View
                style={{ flexDirection: "column", justifyContent: "center" }}
              >
                {items.all.map((item, index) => {
                  return (
                    <View
                      key={Math.random() * index}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 10,
                      }}
                    >
                      <Text
                        key={Math.random() / 3}
                        style={{ marginRight: 20, fontSize: 20 }}
                      >
                        {item}
                      </Text>
                      <TextInput
                        placeholder={`กรุณากรอกค่า ${item}`}
                        key={input[index].id}
                        keyboardType="numeric"
                        onChangeText={(text) =>
                          handleAllInput(index, text, item)
                        }
                        style={{
                          borderWidth: 2,
                          borderColor: "black",
                          padding: 20,
                          width: "80%",
                          borderRadius: 5,
                        }}
                      />
                    </View>
                  );
                })}
                {Platform.OS === "android" ? (
                  <TouchableOpacity
                    onPress={calculateFunction}
                    style={{ backgroundColor: "blue" }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 20,
                        textAlign: "center",
                      }}
                    >
                      Calculate
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <Button
                    title="Calculate"
                    onPress={calculateFunction}
                  ></Button>
                )}
              </View>
            ) : (
              items.all.map((item, i) => {
                return (
                  <TouchableOpacity
                    key={(Math.random() * 10 ** 5) / 3}
                    style={styles.theoryContainer}
                    onPress={() => {
                      selectedHandle(item);
                    }}
                  >
                    <Text key={i + Math.random() - 3 * 2}>
                      {item.split(" ")}
                    </Text>
                  </TouchableOpacity>
                );
              })
            )}
          </View>
        );
      })}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backBtn: {
    position: "absolute",
    top: Platform.OS === "ios" ? 5 : 55,
    left: Platform.OS === "android" ? 0 : 5,
    padding: 5,
    zIndex: 200
  },
  backText: {
    fontWeight: "700",
    fontSize: Platform.OS === "android" ? 70 : 50,
    zIndex: 100,
  },
  theoryContainer: {
    padding: 10,
    backgroundColor: "#ccc",
    borderRadius: 5,
    margin: 5,
  },
  theoryTitle: {
    fontSize: Platform.OS === "android" ? 25 : 30,
    alignSelf: "center",
    marginTop: Platform.OS === "ios" ? 20 : 50,
    marginLeft: Platform.OS === "android" ? 100 : 0,
    marginBottom: Platform.OS === "android" ? 20 : 0,
  },
});
