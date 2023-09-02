import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
} from "react-native";

export const Note = ({ createNote, noteID, editNote }) => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [titleInput, setTitleInput] = useState('');
  const [noteInput, setNoteInput] = useState('');

  useEffect(() => {
    if (noteID.length !== 0) {
      setNoteInput(noteID['note']['note']);
      setTitleInput(noteID['note']['title']);
    }
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

  const handleSave = () => {
    if (noteID.length === 0) {
      const title = titleInput.trim();
      const note = noteInput.trim();
      if (!note && !title) alert("Note and Title can't be empty")
      else if (!title) alert("Title can't be empty!")
      else if (!note) alert("Note can't be empty")
      else createNote(title, note);
    }
    else {
      if (!noteInput && !titleInput) alert("Note and Title can't be empty")
      else if (!titleInput) alert("Title can't be empty!")
      else if (!noteInput) alert("Note can't be empty")
      else editNote(noteID.id, [noteInput, titleInput])
    }
  }

  return (
    <>
      <ScrollView style={styles.container}>
        <TextInput
          placeholder="Enter your title here!"
          style={styles.inputTitle}
          value={titleInput}
          onChangeText={setTitleInput}
        />
        <TextInput
          placeholder="Enter your note here!"
          style={styles.inputNote}
          multiline={true}
          textAlignVertical="top"
          numberOfLines={25}
          value={noteInput}
          onChangeText={setNoteInput}
        />
      </ScrollView>
      {!isKeyboardVisible && ( 
        <View style={styles.saveBtn}>
          <Button title="Save Note" onPress={handleSave} />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  inputTitle: {
    marginBottom: 20,
    fontSize: 20,
    fontWeight: "700",
  },
  inputNote: {
    fontSize: 16,
    flex: 1,
    textAlignVertical: "top",
  },
  saveBtn: {
    position: "absolute",
    bottom: 30,
    width: "100%",
  },
});

export default Note;
