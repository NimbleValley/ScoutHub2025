import { collection, getDocs } from 'firebase/firestore';
import React from 'react';
import { Linking, ScrollView, StyleSheet, Text, View } from 'react-native';
import { database } from '../firebase';
import PitTeam from '../util/pit-team';

const HomeScreen = () => {

  
  const teams = useTeamList('2025wimc');
  const pitScoutedTeams = usePitScoutedTeams();
  const teamsWithImages = useTeamsWithImages();
  console.log(pitScoutedTeams);

  return (
    <View style={styles.pageContainer}>
      <ScrollView style={styles.scrollView}>
      <Text style={styles.titleText}>Pit Scouting Dashboard</Text>
      <Text style={styles.normalText}>Below is the team list with options to pre-scout, pit-scout, or take an image. The color of the button indicates status: grey if the team is already scouted or red if it requires scouting. Scouting a team multiple times may overrite data so make sure to coordinate who scouts which teams. </Text>

        <View style={styles.scrollViewContainer}>
          {teams.map(team => (
            <PitTeam
              key={team}
              number={parseInt(team)}
              pre={true}
              pit={pitScoutedTeams.includes(parseInt(team))}
              image={teamsWithImages.includes(parseInt(team))}
            />
          ))}
        </View>
      </ScrollView>

    </View>
  );
}


function usePitScoutedTeams() {
  const [teams, setTeams] = React.useState([]);
  
  React.useEffect(() => {
    async function fetchPitScoutedTeams() {
      try {
        const querySnapshot = await getDocs(collection(database, 'pitScout'));
        const teamList = querySnapshot.docs
  .map(doc => parseInt(doc.data().teamNumber, 10))
  .filter(n => !isNaN(n))
        setTeams(teamList);
      } catch (error) {
        console.error('Error fetching pitScout teams:', error);
      }
    }

    fetchPitScoutedTeams();
  }, []);

  return teams;
}

function useTeamsWithImages() {
  const [teams, setTeams] = React.useState([]);
  
  React.useEffect(() => {
    async function fetchPitScoutedTeams() {
      try {
        const querySnapshot = await getDocs(collection(database, 'robotImages'));
        const teamList = querySnapshot.docs
  .map(doc => parseInt(doc.data().teamNumber, 10))
  .filter(n => !isNaN(n))
        setTeams(teamList);
      } catch (error) {
        console.error('Error fetching images of teams:', error);
      }
    }

    fetchPitScoutedTeams();
  }, []);

  return teams;
}

function useTeamList(eventKey = "2025wimc") {
  const [teams, setTeams] = React.useState([]);

  React.useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch(
          `https://www.thebluealliance.com/api/v3/event/${eventKey}/teams/keys`,
          {
            headers: {
              'X-TBA-Auth-Key': 'sBluV8DKQA0hTvJ2ABC9U3VDZunUGUSehxuDPvtNC8SQ3Q5XHvQVt0nm3X7cvP7j',
            },
          }
        );

        const teamKeys = await response.json(); // ["frc254", "frc1678", ...]
        const numbersOnly = teamKeys
          .map(key => parseInt(key.replace("frc", ""), 10))
          .filter(n => !isNaN(n))
          .sort((a, b) => a - b); // Sort numerically

        setTeams(numbersOnly);
      } catch (error) {
        console.error("Error fetching TBA team list:", error);
      }
    };

    fetchTeams();
  }, [eventKey]);

  return teams;
}



const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    padding: 0,
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  titleText: {
    fontSize: 35,
    padding: 25,
    textAlign: 'center',
    width: '100%',
  },
  normalText: {
    fontSize: 22,
    padding: 15,
    textAlign: 'center',
    width: '100%',
  },
  scrollViewContainer: {
    paddingBottom: 50,
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
    padding: 0,
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