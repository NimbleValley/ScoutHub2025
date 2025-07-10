import AlgaeImage from '@/assets/images/algae.png';
import ReefImage from '@/assets/images/reef.png';
import { Picker } from '@react-native-picker/picker';
import React from 'react';
import { Animated, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AutoScreen = () => {

    const rotateAnim = React.useRef(new Animated.Value(0)).current;
    const [rotated, setRotated] = React.useState(false);
    const [selectedStartPosition, setSelectedStartPosition] = React.useState('Far');

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

    const [autoL4Count, setAutoL4Count] = React.useState(0);
    const [autoL3Count, setAutoL3Count] = React.useState(0);
    const [autoL2Count, setAutoL2Count] = React.useState(0);
    const [autoL1Count, setAutoL1Count] = React.useState(0);
    const [autoMissCoralCount, setautoMissCoralCount] = React.useState(0);

    const [autoNetCount, setAutoNetCount] = React.useState(0);
    const [autoMissNetCount, setautoMissNetCount] = React.useState(0);
    const [autoProcessorCount, setAutoProcessorCount] = React.useState(0);

    const [leave, setLeave] = React.useState(true);

    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.pageContainer}>
                <Text style={styles.title}>AUTONOMOUS MODE</Text>

                <View style={[styles.horizontalContainer, {width: '90%', marginTop: 15,}]}>
                    <Text style={styles.label}>Starting position:</Text>
                    <Picker
                        style={styles.input}
                        selectedValue={selectedStartPosition}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedStartPosition(itemValue)
                        }>
                        <Picker.Item label="Far" value="Far" />
                        <Picker.Item label="Center" value="Center" />
                        <Picker.Item label="Processor" value="Processor" />
                    </Picker>
                </View>

                <View style={styles.reefContainer}>
                    <Image source={ReefImage} style={styles.reefImage}></Image>
                    <View style={styles.reefOperationsContainer}>

                        {/* LEVEL FOUR */}
                        <View style={styles.reefOperation}>
                            <View style={styles.horizontalContainer}>
                                <Text style={styles.reefOperationLabel}>L4:</Text>
                                <Text style={styles.reefOperationCount}>{autoL4Count}</Text>
                            </View>
                            <View style={styles.horizontalContainer}>
                                <TouchableOpacity onPress={() => setAutoL4Count(autoL4Count + 1)}>
                                    <Ionicons name={'add-circle-outline'} size={54} color={'darkgreen'} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { if (autoL4Count > 0) setAutoL4Count(autoL4Count - 1) }}>
                                    <Ionicons name={'remove-circle-outline'} size={54} color={'darkred'} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* LEVEL THREE */}
                        <View style={styles.reefOperation}>
                            <View style={styles.horizontalContainer}>
                                <Text style={styles.reefOperationLabel}>L3:</Text>
                                <Text style={styles.reefOperationCount}>{autoL3Count}</Text>
                            </View>
                            <View style={styles.horizontalContainer}>
                                <TouchableOpacity onPress={() => setAutoL3Count(autoL3Count + 1)}>
                                    <Ionicons name={'add-circle-outline'} size={54} color={'darkgreen'} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { if (autoL3Count > 0) setAutoL3Count(autoL3Count - 1) }}>
                                    <Ionicons name={'remove-circle-outline'} size={54} color={'darkred'} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* LEVEL TWO */}
                        <View style={styles.reefOperation}>
                            <View style={styles.horizontalContainer}>
                                <Text style={styles.reefOperationLabel}>L2:</Text>
                                <Text style={styles.reefOperationCount}>{autoL2Count}</Text>
                            </View>
                            <View style={styles.horizontalContainer}>
                                <TouchableOpacity onPress={() => setAutoL2Count(autoL2Count + 1)}>
                                    <Ionicons name={'add-circle-outline'} size={54} color={'darkgreen'} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { if (autoL2Count > 0) setAutoL2Count(autoL2Count - 1) }}>
                                    <Ionicons name={'remove-circle-outline'} size={54} color={'darkred'} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* LEVEL ONE */}
                        <View style={styles.reefOperation}>
                            <View style={styles.horizontalContainer}>
                                <Text style={styles.reefOperationLabel}>L1:</Text>
                                <Text style={styles.reefOperationCount}>{autoL1Count}</Text>
                            </View>
                            <View style={styles.horizontalContainer}>
                                <TouchableOpacity onPress={() => setAutoL1Count(autoL1Count + 1)}>
                                    <Ionicons name={'add-circle-outline'} size={54} color={'darkgreen'} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { if (autoL1Count > 0) setAutoL1Count(autoL1Count - 1) }}>
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
                        <Text style={styles.reefOperationCount}>{autoMissCoralCount}</Text>
                    </View>
                    <View style={styles.horizontalContainer}>
                        <TouchableOpacity onPress={() => setautoMissCoralCount(autoMissCoralCount + 1)}>
                            <Ionicons name={'add-circle-outline'} size={54} color={'darkgreen'} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { if (autoMissCoralCount > 0) setautoMissCoralCount(autoMissCoralCount - 1) }}>
                            <Ionicons name={'remove-circle-outline'} size={54} color={'darkred'} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.algaeContainer}>


                    <View style={styles.netContainer}>
                        <View style={styles.algaeOperation}>
                            <View style={styles.horizontalContainer}>
                                <Text style={styles.algaeOperationLabel}>Made net:</Text>
                                <Text style={styles.reefOperationCount}>{autoNetCount}</Text>
                            </View>
                            <View style={styles.horizontalContainer}>
                                <TouchableOpacity onPress={() => setAutoNetCount(autoNetCount + 1)}>
                                    <Ionicons name={'add-circle-outline'} size={54} color={'darkgreen'} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { if (autoNetCount > 0) setAutoNetCount(autoNetCount - 1) }}>
                                    <Ionicons name={'remove-circle-outline'} size={54} color={'darkred'} />
                                </TouchableOpacity>
                            </View>
                        </View>


                        <View style={[styles.algaeOperation, { backgroundColor: '#f5a9a9' }]}>
                            <View style={styles.horizontalContainer}>
                                <Text style={styles.algaeOperationLabel}>Missed net:</Text>
                                <Text style={styles.reefOperationCount}>{autoMissNetCount}</Text>
                            </View>
                            <View style={styles.horizontalContainer}>
                                <TouchableOpacity onPress={() => setautoMissNetCount(autoMissNetCount + 1)}>
                                    <Ionicons name={'add-circle-outline'} size={54} color={'darkgreen'} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { if (autoMissNetCount > 0) setautoMissNetCount(autoMissNetCount - 1) }}>
                                    <Ionicons name={'remove-circle-outline'} size={54} color={'darkred'} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <View style={styles.netContainer}>
                        <View style={styles.algaeOperation}>
                            <View style={styles.horizontalContainer}>
                                <Text style={styles.algaeOperationLabel}>Processor:</Text>
                                <Text style={styles.reefOperationCount}>{autoProcessorCount}</Text>
                            </View>
                            <View style={styles.horizontalContainer}>
                                <TouchableOpacity onPress={() => setAutoProcessorCount(autoProcessorCount + 1)}>
                                    <Ionicons name={'add-circle-outline'} size={54} color={'darkgreen'} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { if (autoProcessorCount > 0) setAutoProcessorCount(autoProcessorCount - 1) }}>
                                    <Ionicons name={'remove-circle-outline'} size={54} color={'darkred'} />
                                </TouchableOpacity>
                            </View>
                        </View>


                        <TouchableOpacity style={[styles.algaeOperation, { backgroundColor: 'transparent' }]} onPress={handleAlgaePress}>
                            <Animated.Image source={AlgaeImage} style={[styles.algaeImage, animatedStyle]}></Animated.Image>
                        </TouchableOpacity>
                    </View>



                </View>


                <TouchableOpacity style={styles.checkbox} onPress={() => setLeave(!leave)}>
                    <Text style={styles.checkboxText}>Ended off start line:</Text>
                    <Ionicons name={leave ? 'checkmark-circle-outline' : 'close-circle-outline'} size={54} color={leave ? 'green' : 'red'} />
                </TouchableOpacity>

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
        color: '#b00c00'
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
});

export default AutoScreen;