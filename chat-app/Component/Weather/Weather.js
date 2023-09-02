import axios from "axios";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  Dimensions,
} from "react-native";

export const Weather = ({ darkMode }) => {
  const [data, setData] = useState({});
  const url = "https://weatherapi-com.p.rapidapi.com/current.json";

  useEffect(() => {
    getWeather();
  }, []);

  const getWeather = async () => {
    try {
      const response = await axios.get(url, {
        headers: {
          "X-RapidAPI-Key":
            "321886be49msh84ae54195e4cef2p178fd1jsnafa6afbc42b1",
          "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
        },
        params: {
          q: "13.736717, 100.523186",
        },
      });
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.weatherContainer}>
      {/* && ตามหลังเพื่อให้มั่นใจว่า ข้อมูล 2 ตัวก่อนหน้าถูกดึงมาแล้ว */}
      {data.current && data.current.condition && (
        <>
          <Image
            source={{ uri: `https:${data.current.condition["icon"]}` }}
            style={styles.weatherImage}
            resizeMode="contain"
          />
          <View style={{flexDirection: 'column', display: 'flex', justifyContent: 'center', width: '70%', alignItems:'center'}}>
            <Text style={styles.weatherText}>
              {`${data.current["temp_c"]}`}&#8451;
            </Text>
            <Text style={styles.weatherText}>
              {data.current['condition']['text']}
            </Text>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  weatherContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Platform.OS === 'android' ? 20 : 50
  },
  weatherText: {
    fontSize: Platform.OS === "android" ? 20 : 30,
    fontWeight: '700',
    color: "white"
  },
  weatherImage: {
    width: "80%",
    height: Dimensions.get("screen").height / 4,
  },
});
