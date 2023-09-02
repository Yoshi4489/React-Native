import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Platform,
  Button,
  Keyboard,
} from "react-native";
import { Note } from "./Note";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Notes = ({ backToHome }) => {
  const [data, setData] = useState([]);
  const [notes, setNotes] = useState([]);
  const [writeNote, setWriteNote] = useState(false);
  const [noteID, setNoteID] = useState([]);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [noteRow, setNoteRow] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const noteData = await AsyncStorage.getItem("note");
        if (noteData !== null) {
          const parsedData = JSON.parse(noteData);
          setData(parsedData);
          setNotes(parsedData);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getData();
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const createNote = (title, note) => {
    setWriteNote(false);
    const updatedNote = {
      title: title,
      note: note,
    };
    setNotes((prev) => [...prev, updatedNote]);
    setData((prev) => [...prev, updatedNote]);
    saveDataToStorage([...notes, updatedNote]);
  };

  const edidtNote = (id, note = []) => {
    if (note.length > 0) {
      setWriteNote(false);
      const updatedNote = {
        note: note[0],
        title: note[1],
      };
      notes[id] = updatedNote;
      setNoteID([]);
      setData([...notes]);
      saveDataToStorage([...notes]);
    } else {
      setNoteID({
        note: notes[id],
        id: id,
      });
    }
  };

  const filterNote = (e) => {
    if (e.nativeEvent.text === "") setNotes(data);
    else {
      const filteredNote = data.filter(
        (note) => note.title === e.nativeEvent.text
      );
      setNotes(filteredNote);
    }
  };

  const saveDataToStorage = async (notes) => {
    try {
      const noteData = JSON.stringify(notes);
      await AsyncStorage.setItem("note", noteData);
      console.log("Data saved successfully.");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {writeNote ? (
        <>
          {Platform.OS === "android" ? (
            <View style={{ marginTop: 40, width: "20%", marginLeft: 20 }}>
              <Button title="Back" onPress={() => setWriteNote(false)}></Button>
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => setWriteNote(false)}
              style={{ marginTop: 30 }}
            >
              <Text style={{ fontSize: 50, fontWeight: "700" }}>&lt;</Text>
            </TouchableOpacity>
          )}
          <Note createNote={createNote} noteID={noteID} editNote={edidtNote} />
        </>
      ) : (
        <>
          {Platform.OS === "android" ? (
            <View
              style={{
                position: "absolute",
                top: 50,
                width: 100,
                backgroundColor: "black",
                zIndex: 500,
              }}
            >
              <TouchableOpacity onPress={backToHome}>
                <Text>Back</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              onPress={backToHome}
              style={style.homeButtonContainer}
            >
              <Text style={style.homeButton}>&lt;</Text>
            </TouchableOpacity>
          )}
          <ScrollView style={style.container}>
            <Text style={style.title}>My Notes</Text>
            <View style={style.input}>
              <TextInput placeholder="Search Note" onChange={filterNote} />
              <TouchableOpacity>
                <Text style={{ fontSize: 22, fontWeight: "700" }}>X</Text>
              </TouchableOpacity>
            </View>
            <View style={[style.allnoteContainer, { justifyContent: noteRow ? 'space-between' : 'center'}]}>
              {notes.map((note, index) => {
                return (
                  <>
                    <TouchableOpacity
                      key={index}
                      style={
                        noteRow ? style.noteContainerRow
                        : style.noteContainerColumn
                      }
                      onPress={() => {
                        edidtNote(index);
                        setWriteNote(true);
                      }}
                    >
                      <Text style={style.noteTitle}>{note.title}</Text>
                      <Text style={style.noteText}>{note.note}</Text>
                    </TouchableOpacity>
                  </>
                );
              })}
            </View>
          </ScrollView>
          {keyboardVisible ? null : (
            <TouchableOpacity
              style={style.addButton}
              onPress={() => {
                setWriteNote(true);
                setNoteID([]);
              }}
            >
              <Text style={style.addTextButton}>+</Text>
            </TouchableOpacity>
          )}
        </>
      )}
    </>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === "android" ? 40 : 30,
  },
  allnoteContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
    flex: 1,
    margin: 20,
    marginTop: 20,
    alignItems: "center",
  },
  noteContainerRow: {
    width: "43%",
    borderRadius: 7,
    backgroundColor: "#b8b8b8",
    padding: 20,
    margin: Platform.OS === "android" ? 5 : 15,
  },
  noteContainerColumn: {
    width: "95%",
    borderRadius: 7,
    backgroundColor: "#b8b8b8",
    padding: 20,
    margin: Platform.OS === "android" ? 5 : 15,
  },
  noteTitle: {
    fontSize: 22,
    fontWeight: "700",
  },
  noteText: {
    fontSize: 16,
    fontWeight: "400",
  },
  addButton: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "#427dde",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  addTextButton: {
    fontSize: 22,
    fontWeight: "700",
    color: "white",
  },
  title: {
    fontSize: Platform.OS === "android" ? 30 : 50,
    textAlign: "center",
    fontWeight: "700",
  },
  input: {
    width: "70%",
    position: "relative",
    padding: 10,
    borderColor: "black",
    borderWidth: 2,
    borderStyle: "solid",
    borderRadius: 30,
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  homeButtonContainer: {
    position: "absolute",
    top: 20,
    left: 10,
    zIndex: 100,
  },
  homeButton: {
    fontSize: 60,
    fontWeight: "700",
  },
});
