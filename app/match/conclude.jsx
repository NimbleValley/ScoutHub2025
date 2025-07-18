import { Picker } from '@react-native-picker/picker';
import React from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { doc, setDoc } from 'firebase/firestore';
import { database } from '../firebase';

import { useRouter } from 'expo-router';

import { useForm } from '../form';
import Checkbox from '../util/checkbox';

// inside your component
const router = useRouter();

const ConcludeScreen = () => {

    const [driverSkill, setDriverSkill] = React.useState(3);

    const [commentText, setCommentText] = React.useState('');

    const { state, dispatch } = useForm();

    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.pageContainer}>

                <Checkbox field="lostComms" label="Lost comms?"></Checkbox>

                <Checkbox field="disabled" label="Disabled/broke down?"></Checkbox>

                <View style={[styles.horizontalContainer, { width: '90%', marginTop: 15, }]}>
                    <Text style={styles.label}>Driver rating:</Text>
                    <Picker
                        style={styles.input}
                        selectedValue={state.driverSkill}
                        onValueChange={(value) =>
                            dispatch({ type: 'UPDATE_FIELD', field: 'driverSkill', value })
                        }>
                        <Picker.Item label='Excellent' value='5' />
                        <Picker.Item label='Good' value='4' />
                        <Picker.Item label='Alright' value='3' />
                        <Picker.Item label='Clunky' value='2' />
                        <Picker.Item label='Awful' value='1' />
                    </Picker>
                </View>

                <View style={styles.verticalContainer}>
                    <Text style={styles.commentLabel}>Final Comments:</Text>
                    <TextInput
                        style={styles.commentInput}
                        onChangeText={(text) =>
                            dispatch({ type: 'UPDATE_FIELD', field: 'commentText', value: text })
                        }
                        value={state.commentText}
                        placeholderTextColor='grey'
                        placeholder='Please write a useful comment for alliance considerations, not just `slow at L2 good climb.`'
                        multiline={true}
                        numberOfLines={4}
                    />
                </View>

                <TouchableOpacity style={styles.submitButton}
                    onPress={() => submitForm(state, dispatch)}
                >
                    <Text style={styles.buttonText}>Submit Form</Text>
                </TouchableOpacity>

            </View>
        </ScrollView>
    );
}

async function submitForm(state, dispatch) {
    console.log('Submitting form...');

    try {
        const teamMissing = !state.teamNumber?.trim();
        const matchMissing = !state.matchNumber?.trim();
        const commentMissing = !state.commentText?.trim();

        const autoPointsCount = (parseInt(state.autoL4Count) * 7) + (parseInt(state.autoL3Count) * 6) + (parseInt(state.autoL2Count) * 4) + (parseInt(state.autoL1Count) * 3) + (parseInt(state.autoNetCount) * 4) + (parseInt(state.autoProcessorCount) * 3) + (state.leave ? 3 : 0);
        const telePointsCount = (parseInt(state.teleL4Count) * 5) + (parseInt(state.teleL3Count) * 4) + (parseInt(state.teleL2Count) * 3) + (parseInt(state.teleL1Count) * 2) + (parseInt(state.teleNetCount) * 4) + (parseInt(state.teleProcessorCount) * 3);

        var endgamePointsCount = 0;
        if (state.selectedClimb == 'No') {
            endgamePointsCount = state.park ? 2 : 0;
        } else {
            endgamePointsCount = state.selectedClimb == 'Deep' ? 12 : 6;
        }

        const totalPointsCount = autoPointsCount + telePointsCount + endgamePointsCount;

        const autoCoralCount = parseInt(state.autoL4Count) + parseInt(state.autoL3Count) + parseInt(state.autoL2Count) + parseInt(state.autoL1Count);
        const teleCoralCount = parseInt(state.teleL4Count) + parseInt(state.teleL3Count) + parseInt(state.teleL2Count) + parseInt(state.teleL1Count);
        const totalCoralCount = autoCoralCount + teleCoralCount;
        const totalAlgaeCount = parseInt(state.autoNetCount) + parseInt(state.autoProcessorCount) + parseInt(state.teleNetCount) + parseInt(state.teleProcessorCount);
        const totalGamepiecesCount = totalCoralCount + totalAlgaeCount;

        // Submit to Firestore
        await setDoc(doc(database, 'scoutingForms', `match${state.matchNumber}_team${state.teamNumber}`), {
            ...state,
            teamNumber: teamMissing ? -1 : state.teamNumber,
            matchNumber: matchMissing ? -1 : state.matchNumber,
            commentText: commentMissing ? `${state.nameText} didn't write a comment :(` : state.commentText,
            park: state.selectedClimb == 'No' ? state.park : false,
            timestamp: new Date(),
            autoPoints: autoPointsCount,
            telePoints: telePointsCount,
            endgamePoints: endgamePointsCount,
            totalPoints: totalPointsCount,
            autoCoral: autoCoralCount,
            teleCoral: teleCoralCount,
            totalCoral: totalCoralCount,
            totalAlgae: totalAlgaeCount,
            totalGamepieces: totalGamepiecesCount
        });

        alert('Data submitted successfully! A new form will begin now.');

        const savedName = state.nameText;
        const savedStation = state.selectedStation;
        const currentMatch = parseInt(state.matchNumber) || 0;

        dispatch({ type: 'RESET_FORM' });
        dispatch({ type: 'UPDATE_FIELD', field: 'nameText', value: savedName });
        dispatch({ type: 'UPDATE_FIELD', field: 'selectedStation', value: savedStation });
        dispatch({
            type: 'UPDATE_FIELD',
            field: 'matchNumber',
            value: (currentMatch + 1).toString(),
        });

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