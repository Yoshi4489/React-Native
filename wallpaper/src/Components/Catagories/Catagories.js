import { StyleSheet, View, Text, Image, TouchableOpacity, Platform } from "react-native";

export const Catagories = ({ handleSearch, handleClick }) => {
  return (
    <View style={styles.category}>
      <View style={{justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 10, marginBottom: 10}}>
        <TouchableOpacity
          style={{
            width: "48%",
            height: Platform.OS === "android" ? 150 : 200,
            position: "relative",
          }}
          onPress={() => {
            handleSearch('earth')
            handleClick(true)
          }}
        >
          <Text style={styles.text}>Earth</Text>
          <Image
            source={require("../../../assets/earth.jpg")}
            style={styles.image}
            resizeMode="cover"
          ></Image>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "48%",
            height: Platform.OS === "android" ? 150 : 200,
            position: "relative",
          }}
          onPress={() => {
            handleSearch('moon')
            handleClick(true)
          }}
        >
          <Text style={styles.text}>Moon</Text>
          <Image
            source={require("../../../assets/moon.jpg")}
            style={styles.image}
            resizeMode="cover"
          ></Image>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 10,
        }}
      >
        <TouchableOpacity
          style={{
            width: "48%",
            height: Platform.OS === "android" ? 150 : 200,
            position: "relative",
          }}
          onPress={() => {
            handleSearch('sea')
            handleClick(true)
          }}
        >
          <Text style={styles.text}>Sea</Text>
          <Image
            source={require("../../../assets/sea.jpg")}
            style={styles.image}
            resizeMode="cover"
          ></Image>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "48%",
            height: Platform.OS === "android" ? 150 : 200,
            position: "relative",
          }}
          onPress={() => {
            handleSearch('forest')
            handleClick(true)
          }}
        >
          <Text style={styles.text}>Forest</Text>
          <Image
            source={require("../../../assets/forest.jpg")}
            style={styles.image}
            resizeMode="cover"
          ></Image>
        </TouchableOpacity>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
    category: {
        width: "100%",
        flexDirection: "column",
      },
      image: {
        flex: 1,
        width: "100%",
        borderRadius: 10,
      },
      text : {
        fontSize: Platform.OS === 'android' ? 20 : 30,
        color: 'white',
        fontWeight: '700',
        position: 'absolute',
        top: '40%',
        left: '40%',
        zIndex: 100
      },
})
