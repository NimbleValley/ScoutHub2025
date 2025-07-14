import Logo from '@/assets/images/icon.png';
import { useRouter } from 'expo-router';
import { Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const HomeScreen = () => {

  const router = useRouter();

  return (
    <View style={styles.pageContainer}>
      <Text style={styles.titleText}>Welcome scouter!</Text>
      <Image source={Logo} style={styles.logoStyle}></Image>


      <TouchableOpacity style={styles.matchButton}
        onPress={() => router.push('./match')}
      >
        <Text style={styles.buttonText}>Match Scout</Text>
      </TouchableOpacity>


      <TouchableOpacity style={styles.pitButton}
        onPress={() => router.push('./pit')}
      >
        <Text style={styles.buttonText}>Pit Scout</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.analysisButton}
        onPress={() => handlePress('https://nimblevalley.github.io/Scouting2025')}
      >
        <Text style={styles.buttonText}>Analysis</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    paddingTop: 5,
    alignItems: 'center',
  },
  logoStyle: {
    width: 200,
    height: 155,
    margin: 20,
  },
  titleText: {
    fontSize: 35,
    margin: 25,
  },
  matchButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: 'center',
    width: '50%',
    marginTop: 35,
  },
  pitButton: {
    backgroundColor: '#63ab3f',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: 'center',
    width: '50%',
    marginTop: 35,
  },
  analysisButton: {
    backgroundColor: '#c26e36',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: 'center',
    width: '50%',
    marginTop: 35,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

const handlePress = async (url) => {
  const supported = await Linking.canOpenURL(url);

  if (supported) {
    await Linking.openURL(url);
  } else {
    console.log(`Don't know how to open this URL: ${url}`);
    // Optionally, show an alert to the user
    // Alert.alert(`Don't know how to open this URL: ${url}`);
  }
};

export default HomeScreen;