import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import React from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const ConcludeScreen = () => {

    const [lostComms, setLostComms] = React.useState(false);
    const [disabled, setDisabled] = React.useState(false);

    const [driverSkill, setDriverSkill] = React.useState(3);

    const [commentText, setCommentText] = React.useState('');

    React.useEffect(() => {
        const firstLoad = async () => {
            try {
                await AsyncStorage.setItem('lostComms', false);
                await AsyncStorage.setItem('disabled', false);
                await AsyncStorage.setItem('driverSkill', 3);
                await AsyncStorage.setItem('commentText', 'No comment :(');
            } catch (err) {
                alert('Storage error in auto section. Seek help.');
            }
        };

        firstLoad();
    }, []);

    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.pageContainer}>

                <TouchableOpacity style={styles.checkbox} onPress={async () => {
                    await AsyncStorage.setItem('lostComms', !lostComms);
                    setLostComms(!lostComms); 
                    }}>
                    <Text style={styles.checkboxText}>Lost comms?</Text>
                    <Ionicons name={lostComms ? 'checkmark-circle-outline' : 'close-circle-outline'} size={54} color={lostComms ? 'green' : 'red'} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.checkbox} onPress={async () => {
                    await AsyncStorage.setItem('disabled', !disabled);
                    setDisabled(!disabled); 
                    }}>
                    <Text style={styles.checkboxText}>Disabled/broke down?</Text>
                    <Ionicons name={disabled ? 'checkmark-circle-outline' : 'close-circle-outline'} size={54} color={disabled ? 'green' : 'red'} />
                </TouchableOpacity>

                <View style={[styles.horizontalContainer, { width: '90%', marginTop: 15, }]}>
                    <Text style={styles.label}>Driver rating:</Text>
                    <Picker
                        style={styles.input}
                        selectedValue={driverSkill}
                        onValueChange={async (itemValue, itemIndex) => {
                            setDriverSkill(itemValue);
                            await AsyncStorage.setItem('driverSkill', itemValue);
                        }}>
                        <Picker.Item label='Excellent' value='5' />
                        <Picker.Item label='Good' value='3' />
                        <Picker.Item label='Alright' value='3' />
                        <Picker.Item label='Clunky' value='2' />
                        <Picker.Item label='Awful' value='1' />
                    </Picker>
                </View>

                <View style={styles.verticalContainer}>
                    <Text style={styles.commentLabel}>Final Comments:</Text>
                    <TextInput
                        style={styles.commentInput}
                        onChangeText={async (text) => {
                            setCommentText(text);
                            await AsyncStorage.setItem('commentText', text);
                        }}
                        value={commentText}
                        placeholderTextColor='grey'
                        placeholder='Please write a useful comment for alliance considerations, not just `slow at L2 good climb.`'
                        multiline={true}
                        numberOfLines={4}
                    />
                </View>

                <TouchableOpacity style={styles.submitButton}
                    onPress={submitForm}
                >
                    <Text style={styles.buttonText}>Submit Form</Text>
                </TouchableOpacity>

            </View>
        </ScrollView>
    );
}

const submitForm = async () => {
    console.log('Submitting form...');

    const generalInformation = {
        name: await AsyncStorage.getItem('nameText'),
        matchNumber: await AsyncStorage.getItem('matchNumber'),
        teamNumber: await AsyncStorage.getItem('teamNumber'),
        selectedStation: await AsyncStorage.getItem('selectedStation'),
    }

    const autoInformation = {
        selectedStartPosition: await AsyncStorage.getItem('selectedStartPosition'),
        autoL4Count: await AsyncStorage.getItem('autoL4Count'),
        autoL3Count: await AsyncStorage.getItem('autoL3Count'),
        autoL2Count: await AsyncStorage.getItem('autoL2Count'),
        autoL1Count: await AsyncStorage.getItem('autoL1Count'),
        autoMissCoralCount: await AsyncStorage.getItem('autoMissCoralCount'),
        autoNetCount: await AsyncStorage.getItem('autoNetCount'),
        autoMissNetCount: await AsyncStorage.getItem('autoMissNetCount'),
        autoProcessorCount: await AsyncStorage.getItem('autoProcessorCount'),
        leave: await AsyncStorage.getItem('leave'),
    }

    const teleInformation = {
        teleL4Count: await AsyncStorage.getItem('teleL4Count'),
        teleL3Count: await AsyncStorage.getItem('teleL3Count'),
        teleL2Count: await AsyncStorage.getItem('teleL2Count'),
        teleL1Count: await AsyncStorage.getItem('teleL1Count'),
        teleMissCoralCount: await AsyncStorage.getItem('teleMissCoralCount'),
        teleNetCount: await AsyncStorage.getItem('teleNetCount'),
        teleMissNetCount: await AsyncStorage.getItem('teleMissNetCount'),
        teleProcessorCount: await AsyncStorage.getItem('teleProcessorCount'),
        park: await AsyncStorage.getItem('park'),
        selectedClimb: await AsyncStorage.getItem('selectedClimb'),
    }

    const concludingInformation = {
        lostComms: await AsyncStorage.getItem('lostComms'),
        disabled: await AsyncStorage.getItem('disabled'),
        driverSkill: await AsyncStorage.getItem('driverSkill'),
        commentText: await AsyncStorage.getItem('commentText'),
    }

    
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
    horizontalContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
    },
    checkbox: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 25,
        backgroundColor: '#e6d4c3',
        padding: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        gap: 10,
    },
    checkboxText: {
        fontSize: 24
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
    label: {
        fontSize: 20,
        width: '33%',
        textAlign: 'right',
        fontWeight: 'bold',
    },
    verticalContainer: {
        marginTop: 25,
        width: '95%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    commentLabel: {
        fontSize: 20,
        width: 'auto',
        textAlign: 'left',
        fontWeight: 'bold',
        position: 'absolute',
        zIndex: 5,
        backgroundColor: '#FFF6EA',
        padding: 5,
        borderWidth: 1,
        width: '50%',
        borderRadius: 3,
        borderColor: 'black',
        marginLeft: 20,
    },
    commentInput: {
        height: 200,
        margin: 12,
        marginTop: 20,
        borderWidth: 1,
        padding: 10,
        paddingTop: 25,
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
        marginBottom: 50,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default ConcludeScreen;