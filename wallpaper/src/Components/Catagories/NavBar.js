import { StyleSheet, Text, TouchableOpacity, Image, View, Platform } from "react-native"

export const NavBar = ({ handleClick, tag }) => {
  const handleBack = () => {
    handleClick()
  }
  return (
    <View style={styles.navbar}>
      <Text style={{textAlign: 'center', fontSize: Platform.OS === 'android' ? 20 : 30, fontWeight: '700', textTransform: 'capitalize'}}>{tag}</Text>
      <TouchableOpacity style={styles.btn} onPress={() => handleBack()}>
        <Image
          source={require('../../../assets/back.jpg')}
          resizeMode="cover"
          style={styles.img}
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  navbar: {
    width: '100%',
    marginTop: 10,
    marginBottom : 30
  },
  btn: {
    height: 35,
    width: 35,
    position: 'absolute',
    left: 20,
    alignItems: 'center',
    justifyContent: 'center', 
  },
  img: {
    height: '100%', 
    width: '100%', 
  },
})
