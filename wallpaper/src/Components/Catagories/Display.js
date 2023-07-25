import {
  View,
  StyleSheet,
  Platform,
  Image,
  TouchableOpacity,
  Text,
} from "react-native";

const Display = ({ wallpaper, backFunction }) => {
  const download = async () => {
    try {
      const downloadDest = `${RNFS.DownloadDirectoryPath}/image.jpg`;
      const options = {
        fromUrl: wallpaper.previewURL,
        toFile: downloadDest,
      };
  
      const res = await RNFS.downloadFile(options).promise;
  
      if (res.statusCode === 200) {
        console.log("File downloaded:", downloadDest);
      } else {
        console.log("Download failed");
      }
    } catch (error) {
      console.log("Download error:", error);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Preview</Text>
      <TouchableOpacity style={styles.imgContainer} onPress={backFunction}>
        <Image
          source={require("../../../assets/back.jpg")}
          resizeMode="cover"
          style={styles.img}
        />
      </TouchableOpacity>
      <View style={styles.display}>
        <Image
          source={{ uri: wallpaper }}
          style={styles.imageDisplay}
          resizeMode="cover"
        />
      </View>
      <TouchableOpacity style={styles.downlaodBtn} onPress={download}>
          <Text style={styles.text}>Download</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  display: {
    borderRadius: Platform.OS === "android" ? 20 : 10,
    height: Platform.OS === "android" ? "50%" : "70%",
    width: Platform.OS === "android" ? "50%" : "80%",
    alignSelf: "center",
    marginTop: Platform.OS === 'android' ? '25%' : '10%',
  },
  imageDisplay: {
    height: "100%",
    width: "100%",
    borderRadius: Platform.OS === "android" ? 50 : 30,
  },
  imgContainer: {
    height: 35,
    width: 35,
    position: "absolute",
    top: 30,
    left: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    height: "100%",
    width: "100%",
  },
  downlaodBtn: {
    width: "80%",
    height: Platform.OS === "android" ? 30 : 50,
    borderRadius: 5,
    backgroundColor: "blue",
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  text: {
    color: "white",
    textAlign: "center",
  },
  title: {
    position: "absolute",
    top: 20,
    left: 100,
    fontSize: Platform.OS === "android" ? 35 : 40,
  },
});

export default Display;
