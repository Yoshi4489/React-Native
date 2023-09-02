import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import { months } from "../../Data/month";
import { Weather } from "../../Component/Weather/Weather";
import { Event } from "./Event";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Calendar = ({ backToHome }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [month, setMonth] = useState(currentTime.getMonth());
  const [year, setYear] = useState(currentTime.getFullYear());
  const [dayInMonth, setDayInMonth] = useState([]);
  const [darkMode, setMode] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [event, setEvent] = useState([]);
  const [eventDate, setEventDate] = useState(0);

  const day = require("../../src/day.png");
  const night = require("../../src/moon.png");

  useEffect(() => {
    const getItem = async () => {
      const calendarEvent = await AsyncStorage.getItem("events");
      if (calendarEvent) {
        setEvent(JSON.parse(calendarEvent));
      }
    };
    getItem();
  }, []);

  useEffect(() => {
    fillCalendar();
  }, [year, month]);

  function fillCalendar() {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayInMonth = new Date(year, month, 1).getDay();
    const paddingDay = firstDayInMonth === 0 ? -1 : firstDayInMonth - 1;

    const days = [];
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevYear = month === 0 ? year - 1 : year;
    const prevMonthDays = new Date(prevYear, prevMonth + 1, 0).getDate();
    for (let index = paddingDay; index >= 0; index--) {
      days.push(index - prevMonthDays);
    }

    // this is for this month
    for (let index = 1; index <= daysInMonth; index++) {
      days.push(index);
    }

    setDayInMonth(days);
  }

  function changeMonth(param) {
    switch (param) {
      case "next": {
        if (month >= 11) {
          setMonth(0);
          setYear((prev) => prev + 1);
        } else setMonth((prev) => prev + 1);
        break;
      }
      case "prev": {
        if (month <= 0) {
          setMonth(11);
          setYear((prev) => prev - 1);
        } else setMonth((prev) => prev - 1);
        break;
      }
    }
  }

  function makeEvent(value, newEvent) {
    if (!value) setShowPopup(false);
    else {
      setShowPopup(false);
      const updatedEvent = [newEvent, `${eventDate}/${month}/${year}`];
      setEvent((prev) => [...prev, updatedEvent]);
      saveEvent([...event, updatedEvent]);
    }
  }

  function saveEvent(data) {
    const eventData = JSON.stringify(data);
    AsyncStorage.setItem("events", eventData);
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={[
          styles.leftSide,
          { backgroundColor: darkMode ? "#1724f2" : "#7266cd" },
        ]}
      >
        <View style={{ marginTop: Platform.OS === "android" ? 30 : 50 }}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "flex-start",
            }}
          >
            <TouchableOpacity onPress={backToHome}>
              <Text
                style={{
                  fontSize: Platform.OS === "android" ? 30 : 50,
                  fontWeight: "700",
                }}
              >
                &#8592;
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setMode((prev) => !prev)}
              style={[
                styles.modeButton,
                { backgroundColor: darkMode ? "black" : "#4aba85" },
              ]}
            >
              <Image
                source={darkMode ? night : day}
                resizeMode="contain"
                style={styles.modeImage}
              ></Image>
            </TouchableOpacity>
          </View>
          <Weather darkMode={darkMode} />
          <View>
            <Text style={[styles.taskTitle]}>Your task : </Text>
            <View style={styles.task}>
              {event.map((item, index) => {
                return (
                  <>
                    {index === 0 ? null : (
                      <View style={styles.straightLine}></View>
                    )}
                    <View style={styles.taskContain}>
                      <Text
                        style={[
                          styles.timeStamp,
                          { color: darkMode ? "#1236ad" : "#7266cd" },
                        ]}
                      >
                        {item[1]}
                      </Text>
                      <Text style={[styles.taskText]}>{item[0]}</Text>
                    </View>
                  </>
                );
              })}
            </View>
          </View>
        </View>
      </ScrollView>
      <ScrollView
        style={[
          styles.rightSide,
          ,
          { backgroundColor: darkMode ? "black" : "white" },
        ]}
      >
        <View style={styles.title}>
          <TouchableOpacity onPress={() => changeMonth("prev")}>
            <Text
              style={[
                styles.monthBtn,
                { color: darkMode ? "#d517f2" : "#6c61c5" },
              ]}
            >
              &#60;
            </Text>
          </TouchableOpacity>
          <Text
            style={[styles.month, { color: darkMode ? "#d517f2" : "#6c61c5" }]}
          >
            {months[month]}
          </Text>
          <Text
            style={[
              styles.month,
              { marginLeft: 20, color: darkMode ? "#d517f2" : "#6c61c5" },
            ]}
          >
            {year}
          </Text>
          <TouchableOpacity onPress={() => changeMonth("next")}>
            <Text
              style={[
                styles.monthBtn,
                { color: darkMode ? "#d517f2" : "#6c61c5" },
              ]}
            >
              &#62;
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.weekDay}>
          <Text
            style={[styles.day, { color: darkMode ? "#1236ad" : "#4aba85" }]}
          >
            Sun
          </Text>
          <Text
            style={[styles.day, , { color: darkMode ? "#1236ad" : "#4aba85" }]}
          >
            Mon
          </Text>
          <Text
            style={[styles.day, , { color: darkMode ? "#1236ad" : "#4aba85" }]}
          >
            Tue
          </Text>
          <Text
            style={[styles.day, , { color: darkMode ? "#1236ad" : "#4aba85" }]}
          >
            Wed
          </Text>
          <Text
            style={[styles.day, , { color: darkMode ? "#1236ad" : "#4aba85" }]}
          >
            Thu
          </Text>
          <Text
            style={[styles.day, , { color: darkMode ? "#1236ad" : "#4aba85" }]}
          >
            Fri
          </Text>
          <Text
            style={[styles.day, , { color: darkMode ? "#1236ad" : "#4aba85" }]}
          >
            Sat
          </Text>
        </View>
        <View style={styles.line}></View>
        <View style={styles.calendar}>
          {dayInMonth.map((day, index) => {
            if (day < 0) {
              return (
                <View key={index} style={styles.dayInMonth}>
                  <Text
                    style={{
                      color: "#cccbcb",
                      fontSize: 20,
                      fontWeight: "500",
                    }}
                  >
                    {-day}
                  </Text>
                </View>
              );
            } else {
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.dayInMonth}
                  onPress={() => {
                    setShowPopup(true);
                    setEventDate(day);
                  }}
                  disabled={showPopup ? "disabled" : null}
                >
                  {day === currentTime.getDate() &&
                  month === currentTime.getMonth() &&
                  year === currentTime.getFullYear() ? (
                    <View
                      style={{
                        width: Platform.OS === "android" ? 30 : 50,
                        height: Platform.OS === "android" ? 30 : 50,
                        backgroundColor: darkMode ? "#d517f2" : "#4aba85",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 50,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: "500",
                          color: darkMode ? "black" : "white",
                        }}
                      >
                        {day}
                      </Text>
                    </View>
                  ) : (
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "500",
                        color: darkMode ? "white" : "black",
                      }}
                    >
                      {day}
                    </Text>
                  )}
                </TouchableOpacity>
              );
            }
          })}
        </View>
      </ScrollView>
      {showPopup ? <Event makeEvent={makeEvent} /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
  },
  leftSide: {
    width: Dimensions.get("screen").width / 3,
    height: Dimensions.get("screen").height,
    backgroundColor: "#7266cd",
  },
  rightSide: {
    width: Dimensions.get("screen").width / 2,
    height: Dimensions.get("screen").height,
    backgroundColor: "white",
  },
  title: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginTop: Platform.OS === "android" ? 10 : 20,
    marginBottom: Platform.OS === "android" ? 0 : 30,
  },
  month: {
    fontSize: Platform.OS === "android" ? 30 : 50,
    fontWeight: "900",
    color: "#6c61c5",
    textTransform: "uppercase",
  },
  monthBtn: {
    fontSize: Platform.OS === "android" ? 20 : 35,
    margin: Platform.OS === "android" ? 30 : 40,
    fontWeight: "700",
    color: "#6c61c5",
  },
  weekDay: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "80%",
    alignSelf: "center",
  },
  day: {
    fontSize: 20,
    fontWeight: "700",
    textTransform: "uppercase",
    color: "#4aba85",
  },
  line: {
    width: "90%",
    borderBottomColor: "#d7d7d7",
    borderBottomWidth: 1,
    borderStyle: "solid",
    marginTop: Platform.OS === "android" ? 10 : 30,
    marginBottom: Platform.OS === "android" ? 10 : 30,
    alignSelf: "center",
  },
  calendar: {
    width: "80%",
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    flex: 1,
    height: "100%",
    alignSelf: "center",
    paddingBottom: 50,
  },
  dayInMonth: {
    width: "14.28%",
    height: Platform.OS === "android" ? "20%" : "55%",
    justifyContent: "center",
    alignItems: "center",
  },
  taskTitle: {
    fontSize: Platform.OS === "android" ? 20 : 30,
    fontWeight: "500",
    color: "white",
    marginTop: Platform.OS === "android" ? 10 : 20,
    marginLeft: Platform.OS === "android" ? 20 : 30,
    color: "white",
  },
  task: {
    marginLeft: Platform.OS === "android" ? 20 : 30,
    display: "flex",
    flexDirection: "column",
    marginTop: 10,
  },
  straightLine: {
    backgroundColor: "gray",
    width: 2,
    height: Platform.OS === "android" ? 20 : 50,
    marginLeft: Platform.OS === "android" ? 15 : 20,
  },
  taskContain: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  timeStamp: {
    backgroundColor: "white",
    borderRadius: Platform.OS === "android" ? 20 : "100%",
    padding: Platform.OS === "android" ? 3 : 30,
    marginRight: 30,
    fontSize: Platform.OS === "android" ? 16 : 20,
    fontWeight: "700",
    color: "#6c61c5",
    paddingRight: 5,
    paddingLeft: 5,
  },
  taskText: {
    color: "white",
    fontSize: 16,
  },
  modeButton: {
    width: Platform.OS === "android" ? 20 : 50,
    height: Platform.OS === "android" ? 20 : 50,
    borderRadius: 50,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  modeImage: {
    width: Platform.OS === "android" ? 5 : 30,
    height: Platform.OS === "android" ? 5 : 30,
  },
});
