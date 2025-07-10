import { Picker } from '@react-native-picker/picker';
import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

const GeneralScreen = () => {
    const [nameText, onChangeNameText] = React.useState('');
    const [matchNumber, onChangeMatchNumber] = React.useState('');
    const [teamNumber, onChangeTeamNumber] = React.useState('');
    const [selectedStation, setSelectedStation] = React.useState('java');

    return (
        <View style={styles.pageContainer}>

            <View style={styles.horizontalContainer}>
                <Text style={styles.label}>Scout name:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeNameText}
                    value={nameText}
                    placeholderTextColor='grey'
                    placeholder='ex. Hendrick'
                />
            </View>

            <View style={styles.horizontalContainer}>
                <Text style={styles.label}>Match #:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeMatchNumber}
                    value={matchNumber}
                    keyboardType="numeric"
                    placeholderTextColor='grey'
                    placeholder='ex. 77'
                />
            </View>

            <View style={styles.horizontalContainer}>
                <Text style={styles.label}>Team #:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeTeamNumber}
                    value={teamNumber}
                    keyboardType="numeric"
                    placeholderTextColor='grey'
                    placeholder='ex. 9997'
                />
            </View>

            <View style={styles.horizontalContainer}>
                <Text style={styles.label}>Station:</Text>
                <Picker
                    style={styles.input}
                    selectedValue={selectedStation}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedStation(itemValue)
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

        </View>
    );
}

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        paddingTop: 5,
        alignItems: 'center',
        backgroundColor: '#FFF6EA'
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
        color: 'black'
    },
    horizontalContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'center'
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
        textAlign: 'left',
        color: 'red',
        marginTop: 35
    }
});

export default GeneralScreen;