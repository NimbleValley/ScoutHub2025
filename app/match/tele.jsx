import AlgaeImage from '@/assets/images/algae.png';
import ReefImage from '@/assets/images/reef.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import React from 'react';
import { Animated, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const TeleScreen = () => {

    React.useEffect(() => {
        const firstLoad = async () => {
            try {
                await AsyncStorage.setItem('teleL4Count', 0);
                await AsyncStorage.setItem('teleL3Count', 0);
                await AsyncStorage.setItem('teleL2Count', 0);
                await AsyncStorage.setItem('teleL1Count', 0);
                await AsyncStorage.setItem('teleMissCoralCount', 0);
                await AsyncStorage.setItem('teleNetCount', 0);
                await AsyncStorage.setItem('teleMissNetCount', 0);
                await AsyncStorage.setItem('teleProcessorCount', 0);
                await AsyncStorage.setItem('park', false);
                await AsyncStorage.setItem('selectedClimb', 'no');
            } catch (err) {
                alert('Storage error in tele section. Seek help.');
            }
        };

        firstLoad();
    }, []);

    const rotateAnim = React.useRef(new Animated.Value(0)).current;
    const [rotated, setRotated] = React.useState(false);
    const [selectedClimb, setSelectedClimb] = React.useState('No');

    const rotateInterpolate = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    const animatedStyle = {
        transform: [{ rotate: rotateInterpolate }],
    };

    const handleAlgaePress = () => {
        Animated.timing(rotateAnim, {
            toValue: rotated ? 0 : 1,
            duration: 500,
            useNativeDriver: true,
        }).start(() => {
            setRotated(!rotated);
        });
    };

    const [teleL4Count, setTeleL4Count] = React.useState(0);
    const [teleL3Count, setTeleL3Count] = React.useState(0);
    const [teleL2Count, setTeleL2Count] = React.useState(0);
    const [teleL1Count, setTeleL1Count] = React.useState(0);
    const [teleMissCoralCount, setteleMissCoralCount] = React.useState(0);

    const [teleNetCount, setTeleNetCount] = React.useState(0);
    const [teleMissNetCount, setteleMissNetCount] = React.useState(0);
    const [teleProcessorCount, setTeleProcessorCount] = React.useState(0);

    const [park, setPark] = React.useState(false);

    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.pageContainer}>
                <Text style={styles.title}>TELEOPERATOR MODE</Text>

                <View style={styles.reefContainer}>
                    <Image source={ReefImage} style={styles.reefImage}></Image>
                    <View style={styles.reefOperationsContainer}>

                        {/* LEVEL FOUR */}
                        <View style={styles.reefOperation}>
                            <View style={styles.horizontalContainer}>
                                <Text style={styles.reefOperationLabel}>L4:</Text>
                                <Text style={styles.reefOperationCount}>{teleL4Count}</Text>
                            </View>
                            <View style={styles.horizontalContainer}>
                                <TouchableOpacity onPress={async () => {
                                    await AsyncStorage.setItem('teleL4Count', teleL4Count + 1);
                                    setTeleL4Count(teleL4Count + 1);
                                }}>
                                    <Ionicons name={'add-circle-outline'} size={54} color={'darkgreen'} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={async () => {
                                    if (teleL4Count > 0) {
                                        await AsyncStorage.setItem('teleL4Count', teleL4Count - 1);
                                        setTeleL4Count(teleL4Count - 1)
                                    }

                                }}>
                                    <Ionicons name={'remove-circle-outline'} size={54} color={'darkred'} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* LEVEL THREE */}
                        <View style={styles.reefOperation}>
                            <View style={styles.horizontalContainer}>
                                <Text style={styles.reefOperationLabel}>L3:</Text>
                                <Text style={styles.reefOperationCount}>{teleL3Count}</Text>
                            </View>
                            <View style={styles.horizontalContainer}>
                                <TouchableOpacity onPress={async () => {
                                    await AsyncStorage.setItem('teleL3Count', teleL3Count + 1);
                                    setTeleL3Count(teleL3Count + 1);
                                }}>
                                    <Ionicons name={'add-circle-outline'} size={54} color={'darkgreen'} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={async () => {
                                    if (teleL3Count > 0) {
                                        await AsyncStorage.setItem('teleL3Count', teleL3Count - 1);
                                        setTeleL3Count(teleL3Count - 1)
                                    }

                                }}>
                                    <Ionicons name={'remove-circle-outline'} size={54} color={'darkred'} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* LEVEL TWO */}
                        <View style={styles.reefOperation}>
                            <View style={styles.horizontalContainer}>
                                <Text style={styles.reefOperationLabel}>L2:</Text>
                                <Text style={styles.reefOperationCount}>{teleL2Count}</Text>
                            </View>
                            <View style={styles.horizontalContainer}>
                                <TouchableOpacity onPress={async () => {
                                    await AsyncStorage.setItem('teleL2Count', teleL2Count + 1);
                                    setTeleL2Count(teleL2Count + 1);
                                }}>
                                    <Ionicons name={'add-circle-outline'} size={54} color={'darkgreen'} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={async () => {
                                    if (teleL2Count > 0) {
                                        await AsyncStorage.setItem('teleL2Count', teleL2Count - 1);
                                        setTeleL2Count(teleL2Count - 1)
                                    }

                                }}>
                                    <Ionicons name={'remove-circle-outline'} size={54} color={'darkred'} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* LEVEL ONE */}
                        <View style={styles.reefOperation}>
                            <View style={styles.horizontalContainer}>
                                <Text style={styles.reefOperationLabel}>L1:</Text>
                                <Text style={styles.reefOperationCount}>{teleL1Count}</Text>
                            </View>
                            <View style={styles.horizontalContainer}>
                                <TouchableOpacity onPress={async () => {
                                    await AsyncStorage.setItem('teleL1Count', teleL1Count + 1);
                                    setTeleL1Count(teleL1Count + 1);
                                }}>
                                    <Ionicons name={'add-circle-outline'} size={54} color={'darkgreen'} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={async () => {
                                    if (teleL1Count > 0) {
                                        await AsyncStorage.setItem('teleL1Count', teleL1Count - 1);
                                        setTeleL1Count(teleL1Count - 1)
                                    }

                                }}>
                                    <Ionicons name={'remove-circle-outline'} size={54} color={'darkred'} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* ALGAE CONTAINER*/}

                    </View>
                </View>

                {/* MISS */}
                <View style={styles.missContainer}>
                    <View style={styles.horizontalContainer}>
                        <Text style={styles.reefOperationLabel}>Missed coral:</Text>
                        <Text style={styles.reefOperationCount}>{teleMissCoralCount}</Text>
                    </View>
                    <View style={styles.horizontalContainer}>
                        <TouchableOpacity onPress={async () => {
                            await AsyncStorage.setItem('teleMissCoralCount', teleMissCoralCount + 1);
                            setTeleMissCoralCount(teleMissCoralCount + 1);
                        }}>
                            <Ionicons name={'add-circle-outline'} size={54} color={'darkgreen'} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={async () => {
                            if (teleMissCoralCount > 0) {
                                await AsyncStorage.setItem('teleMissCoralCount', teleMissCoralCount - 1);
                                setTeleMissCoralCount(teleMissCoralCount - 1)
                            }

                        }}>
                            <Ionicons name={'remove-circle-outline'} size={54} color={'darkred'} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.algaeContainer}>


                    <View style={styles.netContainer}>
                        <View style={styles.algaeOperation}>
                            <View style={styles.horizontalContainer}>
                                <Text style={styles.algaeOperationLabel}>Made net:</Text>
                                <Text style={styles.reefOperationCount}>{teleNetCount}</Text>
                            </View>
                            <View style={styles.horizontalContainer}>
                                <TouchableOpacity onPress={async () => {
                                    await AsyncStorage.setItem('teleNetCount', teleNetCount + 1);
                                    setTeleNetCount(teleNetCount + 1);
                                }}>
                                    <Ionicons name={'add-circle-outline'} size={54} color={'darkgreen'} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={async () => {
                                    if (teleNetCount > 0) {
                                        await AsyncStorage.setItem('teleNetCount', teleNetCount - 1);
                                        setTeleNetCount(teleNetCount - 1)
                                    }

                                }}>
                                    <Ionicons name={'remove-circle-outline'} size={54} color={'darkred'} />
                                </TouchableOpacity>
                            </View>
                        </View>


                        <View style={[styles.algaeOperation, { backgroundColor: '#f5a9a9' }]}>
                            <View style={styles.horizontalContainer}>
                                <Text style={styles.algaeOperationLabel}>Missed net:</Text>
                                <Text style={styles.reefOperationCount}>{teleMissNetCount}</Text>
                            </View>
                            <View style={styles.horizontalContainer}>
                                <TouchableOpacity onPress={async () => {
                                    await AsyncStorage.setItem('teleMissNetCount', teleMissNetCount + 1);
                                    setTeleMissNetCount(teleMissNetCount + 1);
                                }}>
                                    <Ionicons name={'add-circle-outline'} size={54} color={'darkgreen'} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={async () => {
                                    if (teleMissNetCount > 0) {
                                        await AsyncStorage.setItem('teleMissNetCount', teleMissNetCount - 1);
                                        setTeleMissNetCount(teleMissNetCount - 1)
                                    }

                                }}>
                                    <Ionicons name={'remove-circle-outline'} size={54} color={'darkred'} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <View style={styles.netContainer}>
                        <View style={styles.algaeOperation}>
                            <View style={styles.horizontalContainer}>
                                <Text style={styles.algaeOperationLabel}>Processor:</Text>
                                <Text style={styles.reefOperationCount}>{teleProcessorCount}</Text>
                            </View>
                            <View style={styles.horizontalContainer}>
                                <TouchableOpacity onPress={async () => {
                                    await AsyncStorage.setItem('teleProcessorCount', teleProcessorCount + 1);
                                    setTeleProcessorCount(teleProcessorCount + 1);
                                }}>
                                    <Ionicons name={'add-circle-outline'} size={54} color={'darkgreen'} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={async () => {
                                    if (teleProcessorCount > 0) {
                                        await AsyncStorage.setItem('teleProcessorCount', teleProcessorCount - 1);
                                        setTeleProcessorCount(teleProcessorCount - 1)
                                    }

                                }}>
                                    <Ionicons name={'remove-circle-outline'} size={54} color={'darkred'} />
                                </TouchableOpacity>
                            </View>
                        </View>


                        <TouchableOpacity style={[styles.algaeOperation, { backgroundColor: 'transparent' }]} onPress={handleAlgaePress}>
                            <Animated.Image source={AlgaeImage} style={[styles.algaeImage, animatedStyle]}></Animated.Image>
                        </TouchableOpacity>
                    </View>



                </View>

                <Text style={styles.endgameTitle}>Endgame:</Text>


                <TouchableOpacity style={[styles.checkbox, selectedClimb == 'No' ? { display: 'flex' } : { display: 'none' }]} onPress={async () => {
                    await AsyncStorage.setItem('park', !park);
                    setPark(!park);
                }}>
                    <Text style={styles.checkboxText}>Parked:</Text>
                    <Ionicons name={park ? 'checkmark-circle-outline' : 'close-circle-outline'} size={54} color={park ? 'green' : 'red'} />
                </TouchableOpacity>

                <View style={[styles.horizontalContainer, { width: '90%', marginBottom: 25, }]}>
                    <Text style={styles.label}>Climbed:</Text>
                    <Picker
                        style={styles.input}
                        selectedValue={selectedClimb}
                        onValueChange={async (itemValue, itemIndex) => {
                            await AsyncStorage.setItem('selectedClimb', itemValue);
                            setSelectedClimb(itemValue);
                        }
                        }>
                        <Picker.Item label="No" value="No" />
                        <Picker.Item label="Shallow ;)" value="Shallow" />
                        <Picker.Item label="Deep" value="Deep" />
                    </Picker>
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
    scrollView: {
        width: '100%',
        backgroundColor: '#FFF6EA',
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'blue'
    },
    reefContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25,
        height: 330,
        gap: 10,
    },
    reefImage: {
        width: 75,
        height: 300
    },
    reefOperationsContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        width: 280,
        height: '100%'
    },
    reefOperation: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#e6d4c3',
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 15
    },
    missContainer: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#f5a9a9',
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 15,
        width: '100%',
        transform: [{ scale: 0.85 }],
        marginTop: 15,
    },
    reefOperationLabel: {
        fontSize: 32
    },
    reefOperationCount: {
        fontSize: 44,
        fontWeight: 'bold'
    },
    horizontalContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
    },
    algaeContainer: {
        backgroundColor: '#58C0A7',
        marginTop: 10,
        width: '95%',
        padding: 10,
        borderRadius: 5,
        gap: 10,
    },
    algaeOperation: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#e6d4c3',
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 15,
        width: '45%'
    },
    algaeOperationLabel: {
        fontSize: 24
    },
    netContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    algaeImage: {
        width: '100%',
        height: '100%',
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
    endgameTitle: {
        fontSize: 36,
        marginTop: 25
    }
});

export default TeleScreen;