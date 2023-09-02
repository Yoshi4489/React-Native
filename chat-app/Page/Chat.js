import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  StatusBar,
  TextInput,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const Chat = ({ backToHome }) => {
  const [message, setMessage] = useState("");
  const [chatData, setChatData] = useState([]);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    const getData = async () => {
      AsyncStorage.clear();
      try {
        const data = await AsyncStorage.getItem("chat");
        if (data) {
          setChatData(JSON.parse(data));
        }
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    saveData();
  }, [chatData]);

  async function getMessage() {
    setTyping(true);
    setMessage("");
    setChatData((prev) => [
      ...prev,
      {
        message: message,
        author: "user",
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      },
    ]);
    const API_KEY = "YOUR API KEY HERE";
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
      }),
    };
    try {
      const respond = await fetch(
        "https://api.openai.com/v1/chat/completions",
        options
      );
      const data = await respond.json();
      setChatData((prev) => [
        ...prev,
        {
          message: data.choices[0].message.content,
          author: "assistant",
          time:
            new Date(Date.now()).getHours() +
            ":" +
            new Date(Date.now()).getMinutes(),
        },
      ]);
      setTyping(false);
    } catch (err) {
      console.log(err);
    }
  }
  

  async function saveData() {
    try {
      await AsyncStorage.setItem("chat", JSON.stringify(chatData));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#5999b3"></StatusBar>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={backToHome}>
          <Text style={styles.title}>&larr;</Text>
        </TouchableOpacity>
        <Text style={styles.title}>PAL</Text>
      </View>
      <ScrollView style={styles.body}>
          {chatData.map((chat, index) => (
            <View
              key={index}
              style={[
                styles.messageContainer,
                chat.author === "user"
                  ? styles.userMessage
                  : styles.assistantMessage,
              ]}
            >
              <Text style={[styles.messageText, chat.author === 'user' ? {color: '#ffffff'} : { color: '#787f91'}]}>{chat.message}</Text>
              <Text style={[styles.timeText, chat.author === 'user' ? {color: '#ffffff'} : { color: '#787f91'}]}>{chat.time}</Text>
            </View>
          ))}
          {typing ? (
            <View
              style={{
                justifyContent: "center",
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
              }}
            >
              <Text>Our bot is typing please wait...</Text>
            </View>
          ) : null}
      </ScrollView>
      <View style={styles.footer}>
        <TextInput
          placeholder="Type message..."
          style={styles.inputContainer}
          value={message}
          onChangeText={setMessage}
        ></TextInput>
        <TouchableOpacity
          style={styles.sendButton}
          onPress={getMessage}
          disabled={message ? null : "disabled"}
        >
          <Image
            source={require("../src/send.png")}
            style={styles.sendImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
    
  );
};

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#5999b3",
    width: "100%",
    height: "10%",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  title: {
    fontSize: 30,
    color: "white",
    fontWeight: "700",
  },
  backButton: {
    maxHeight: "100%",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    position: "absolute",
    left: 20,
  },
  footer: {
    height: "10%",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopColor: "gray",
    borderTopWidth: 1,
    backgroundColor: '#d7e0e4'
  },
  sendButton: {
    height: 100,
    width: 100,
    borderRadius: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  sendImage: {
    width: Platform.OS === "android" ? 40 : 50,
    height: Platform.OS === "android" ? 40 : 50,
  },
  inputContainer: {
    width: Platform.OS === "ios" ? "80%" : "75%",
    padding: 20,
    fontSize: Platform.OS === "android" ? 20 : 30,
  },
  body: {
    height: "80%",
    width: "100%",
    paddingTop: 10,
    paddingHorizontal: 10,
    backgroundColor: '#d7e0e4'
  },
  messageContainer: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 5,
  },
  userMessage: {
    backgroundColor: "#918af1",
    alignSelf: "flex-end",
    maxWidth: "45%",
    color: '#ffffff'
  },
  assistantMessage: {
    backgroundColor: "#f1f5f8",
    alignSelf: "flex-start",
    maxWidth: "45%",
    color: '#868c9f'
  },
  messageText: {
    fontSize: 16,
    fontWeight: "500",
  },
  timeText: {
    color: "white",
    fontSize: 12,
    alignSelf: "flex-end",
    marginTop: 5,
  },
});
