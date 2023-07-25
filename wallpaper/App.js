import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { Catagories } from "./src/Components/Catagories/Catagories";
import { NavBar } from "./src/Components/Catagories/NavBar";
import Display from "./src/Components/Catagories/Display";

export default function App() {
  const [images, setImages] = useState([]);
  const [catagory, setCatagory] = useState(false);
  const [tag, setTag] = useState("");
  const [test, setTest] = useState(false);
  const [imgData, setImgData] = useState('');

  const fetchWallpaper = async (title) => {
    // thank you pixabay for free API
    const response = await fetch(
      `https://pixabay.com/api/?key=37199564-e3ba787fa39504f4faa043453&q=${title}`
    );
    const data = await response.json();
    setImages(data.hits);
    console.log(data)
  };

  useEffect(() => {
    fetchWallpaper("");
  }, []);

  const handleSearch = (data) => {
    fetchWallpaper(data);
    setTag(data);
  };

  const handleClick = () => {
    setCatagory(true);
  };

  const back = () => {
    setCatagory(false);
    fetchWallpaper("");
  };

  const passWallpaper = (img) => {
    setImgData(img)
    setTest(true)
  }

  const backFunction = () => {
    setTest(false)
  }

  return (
    <>
      {test ? <Display wallpaper={imgData} backFunction={backFunction} /> : (
        <View style={styles.container}>
          {catagory ? (
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
              <NavBar handleClick={back} tag={tag} />
              <View style={styles.rowContainer}>
                {images.map((img, index) => {
                  return (
                    <TouchableOpacity
                      onPress={() => passWallpaper(img.webformatURL)}
                      style={styles.imgContainer}
                      key={index}
                    >
                      <Image
                        source={{ uri: img.webformatURL }}
                        style={styles.image}
                        resizeMode="cover"
                      />
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>
          ) : (
            <>
              <Text style={styles.title}>Wallpaper Application</Text>
              <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <Catagories
                  handleSearch={handleSearch}
                  handleClick={handleClick}
                />
                <View style={styles.rowContainer}>
                  {images.map((img, index) => {
                    return (
                      <TouchableOpacity style={styles.imgContainer} key={index} onPress={() => passWallpaper(img.webformatURL)}>
                        <Image
                          source={{ uri: img.webformatURL }}
                          style={styles.image}
                          resizeMode="cover"
                        />
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </ScrollView>
            </>
          )}
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    marginTop: Platform.OS === "android" ? 30 : 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    marginBottom: Platform.OS === "android" ? 10 : 20,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  rowContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  imgContainer: {
    width: "48%",
    height: 200,
    marginVertical: 10,
  },
  image: {
    flex: 1,
    width: "100%",
    borderRadius: 10,
  },
  text: {
    fontSize: Platform.OS === "android" ? 20 : 30,
    color: "white",
    fontWeight: "700",
    position: "absolute",
    top: "40%",
    left: "40%",
    zIndex: 100,
  },
});
