import { useLocalSearchParams, useRouter } from 'expo-router';
import { doc, setDoc } from 'firebase/firestore';
import { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { database } from '../firebase';
import { usePitForm } from './pit-detail-form';

const router = useRouter();

export default function PitDetail() {
  const { team } = useLocalSearchParams();
  const { state, dispatch } = usePitForm();

  useEffect(() => {
    dispatch({ type: 'UPDATE_FIELD', field: 'teamNumber', value: team });
  }, []);

  return (
    <View style={styles.pageContainer}>
      <Text style={styles.titleText}>Pit Scouting Team {team}</Text>

      <ScrollView style={styles.scrollView}>
        <View style={styles.scrollViewContainer}>

          <View style={styles.verticalContainer}>
            <Text style={styles.textInputLabel}>Have they made any recent mechanical/programming changes?</Text>
            <TextInput
              style={styles.textInput}
              placeholderTextColor='grey'
              placeholder='Describe any changes made, leave blank if none'
              multiline={true}
              numberOfLines={3}
              onChangeText={(text) =>
                dispatch({ type: 'UPDATE_FIELD', field: 'recentChanges', value: text })
              }
            />
          </View>

          <View style={styles.verticalContainer}>
            <Text style={styles.textInputLabel}>Do they have new drivers? If so, how experienced are they?</Text>
            <TextInput
              style={styles.textInput}
              placeholderTextColor='grey'
              placeholder='Write "same" if they are the same drivers or describe how much drive time the new ones have'
              multiline={true}
              numberOfLines={3}
              onChangeText={(text) =>
                dispatch({ type: 'UPDATE_FIELD', field: 'driverExperience', value: text })
              }
            />
          </View>

          <View style={styles.verticalContainer}>
            <Text style={styles.textInputLabel}>What is their climb like?</Text>
            <TextInput
              style={styles.textInput}
              placeholderTextColor='grey'
              placeholder='Ask about level (deep, shallow, none), how long it takes, consistency, etc.'
              multiline={true}
              numberOfLines={3}
              onChangeText={(text) =>
                dispatch({ type: 'UPDATE_FIELD', field: 'climbDetails', value: text })
              }
            />
          </View>

          <View style={styles.verticalContainer}>
            <Text style={styles.textInputLabel}>What is their algae game like?</Text>
            <TextInput
              style={styles.textInput}
              placeholderTextColor='grey'
              placeholder='Ask if they can pick up ground algae, score in net or processor, how long it takes, consistency, etc.'
              multiline={true}
              numberOfLines={3}
              onChangeText={(text) =>
                dispatch({ type: 'UPDATE_FIELD', field: 'algaeDetails', value: text })
              }
            />
          </View>

          <TouchableOpacity style={styles.submitButton}
            onPress={() => submitForm(state, dispatch)}
          >
            <Text style={styles.buttonText}>Submit Form</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>

    </View>
  );
}

async function submitForm(state, dispatch) {
  console.log('Submitting form...');

  try {
    // Submit to Firestore
    await setDoc(doc(database, 'pitScout', `pitScout_team${state.teamNumber}`), {
      ...state
    });

    alert('Data submitted successfully! A new form will begin now.');


    dispatch({ type: 'RESET_FORM' });

    router.replace('./');
  } catch (error) {
    console.error('Error submitting data: ', error);
    alert(error);
  }
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    paddingTop: 5,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 35,
    margin: 25,
    textAlign: 'center',
    width: '100%',
  },
  normalText: {
    fontSize: 22,
    margin: 15,
    textAlign: 'center',
    width: '100%',
  },
  scrollViewContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    gap: 20,
  },
  scrollView: {
    width: '100%',
    backgroundColor: '#FFF6EA',
  },
  verticalContainer: {
    marginTop: 25,
    width: '95%',
    display: 'flex',
    borderRadius: 3,
    flexDirection: 'column',
    alignItems: 'flex-start',
    backgroundColor: '#e6d4c3',
  },
  textInputLabel: {
    fontSize: 24,
    width: '90%',
    textAlign: 'left',
    fontWeight: 'bold',
    zIndex: 5,
    padding: 5,
    height: 'auto',
    marginLeft: 20,
  },
  textInput: {
    height: 100,
    margin: 12,
    marginTop: 20,
    borderWidth: 1,
    padding: 10,
    fontSize: 20,
    width: '93.5%',
    borderRadius: 3,
    borderColor: 'black',
    backgroundColor: '#FFF6EA',
    color: 'black',
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#ff8c00',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: 'center',
    width: '50%',
    marginTop: 35,
    marginBottom: 75,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});