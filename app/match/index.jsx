import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useForm } from '../form';

const GeneralScreen = () => {

    const { state, dispatch } = useForm();
    const router = useRouter();

    const [predictedAlliance, setPredictedAlliance] = React.useState('red');
    const [wagerAmount, setWagerAmount] = React.useState(1);

    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.pageContainer}>

                <View style={styles.horizontalContainer}>
                    <Text style={styles.label}>Scout name:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) =>
                            dispatch({ type: 'UPDATE_FIELD', field: 'nameText', value: text })
                        }
                        value={state.nameText}
                        placeholderTextColor='grey'
                        placeholder='ex. Hendrick'
                    />
                </View>

                <View style={styles.horizontalContainer}>
                    <Text style={styles.label}>Match #:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) =>
                            dispatch({ type: 'UPDATE_FIELD', field: 'matchNumber', value: text })
                        }
                        value={state.matchNumber}
                        keyboardType="numeric"
                        placeholderTextColor='grey'
                        placeholder='ex. 77'
                    />
                </View>

                <View style={styles.horizontalContainer}>
                    <Text style={styles.label}>Team #:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) =>
                            dispatch({ type: 'UPDATE_FIELD', field: 'teamNumber', value: text })
                        }
                        value={state.teamNumber}
                        keyboardType="numeric"
                        placeholderTextColor='grey'
                        placeholder='ex. 9997'
                    />
                </View>

                <View style={styles.horizontalContainer}>
                    <Text style={styles.label}>Station:</Text>
                    <Picker
                        style={styles.input}
                        selectedValue={state.selectedStation}
                        onValueChange={(value) =>
                            dispatch({ type: 'UPDATE_FIELD', field: 'selectedStation', value })
                        }>
                        <Picker.Item label="B1" value="B1" />
                        <Picker.Item label="B2" value="B2" />
                        <Picker.Item label="B3" value="B3" />
                        <Picker.Item label="R1" value="R1" />
                        <Picker.Item label="R2" value="R2" />
                        <Picker.Item label="R3" value="R3" />
                    </Picker>
                </View>

                <Text style={styles.teamNumberWarning}>Please check the team number! An incorrect team leads to BAD DATA and WASTES YOUR TIME!</Text>

                <View style={styles.wagerContainer}>

                    <View style={styles.horizontalContainer}>
                        <Text style={styles.label}>Winning alliance:</Text>
                        <Picker
                            style={[styles.input, {color: predictedAlliance}]}
                            selectedValue={predictedAlliance}
                            onValueChange={setPredictedAlliance}
                            >
                            <Picker.Item label="Red" value="red" />
                            <Picker.Item label="Blue" value="blue" />
                        </Picker>
                    </View>

                    <View style={styles.horizontalContainer}>
                        <Text style={styles.label}>Wager:</Text>
                        <Picker
                            style={styles.input}
                            selectedValue={wagerAmount}
                            onValueChange={setWagerAmount}>
                            <Picker.Item label="$5" value="5" />
                            <Picker.Item label="$4" value="4" />
                            <Picker.Item label="$3" value="3" />
                            <Picker.Item label="$2" value="2" />
                            <Picker.Item label="$1" value="1" />
                        </Picker>
                    </View>

                </View>

            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        paddingTop: 5,
        alignItems: 'center',
        backgroundColor: '#FFF6EA',
    },
    scrollView: {
        width: '100%',
        backgroundColor: '#FFF6EA',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        paddingLeft: 10,
        fontSize: 20,
        width: '50%',
        borderRadius: 3,
        borderColor: 'black',
        backgroundColor: '#FFF6EA',
        color: 'black',
    },
    horizontalContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'center',
    },
    label: {
        fontSize: 20,
        width: '33%',
        textAlign: 'right',
        fontWeight: 'bold',
    },
    teamNumberWarning: {
        fontSize: 20,
        width: '90%',
        textAlign: 'center',
        color: 'red',
        marginTop: 35,
    },
    wagerContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginVertical: 25,
        backgroundColor: '#e6d4c3',
        padding: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        gap: 10,
    },
});

export default GeneralScreen;