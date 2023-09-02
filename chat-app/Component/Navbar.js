import { SafeAreaView, StyleSheet, Text, View, Platform } from 'react-native';

export const Navbar = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.decoration}></View>
      <Text style={styles.text}>Home</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      marginTop: Platform.OS === 'android' ? 40 : 50,
    },
    userContainer: {
      backgroundColor: 'gray',
      width: '80%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 20,
      alignItems: 'center',
      borderRadius: 20
    },
    userImage: {
      width: 40, 
      height: 40,
      borderRadius: 40
    },
    text: {
      fontSize: Platform.OS === 'android' ? 20 : 30,
      color : 'white',
      fontWeight: '700',
    },
    decoration: {
      width: '100%',
      height: 400,
      backgroundColor: '#a38ac3',
      borderRadius: 10000,
      position: 'absolute',
      top: -225
    }
});
  
