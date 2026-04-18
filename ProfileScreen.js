import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image
} from 'react-native';

import DeviceInfo from 'react-native-device-info';

const ProfileScreen = () => {

  const [battery, setBattery] = useState(0);

  // Battery listener
  useEffect(() => {
    DeviceInfo.getBatteryLevel().then(level => {
      setBattery(level * 100);
    });
  }, []);

  // Instagram grid posts
  const posts = [
    { id: '1', image: require('../assets/post1.jpg') },
    { id: '2', image: require('../assets/post2.jpg') },
    { id: '3', image: require('../assets/post1.jpg') },
    { id: '4', image: require('../assets/post2.jpg') },
    { id: '5', image: require('../assets/post1.jpg') },
    { id: '6', image: require('../assets/post2.jpg') }
  ];

  return (
    <View style={styles.container}>

      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <Image
          source={require('../assets/profile.png')}
          style={styles.profileImage}
        />

        <Text style={styles.username}>john_doe</Text>

        <Text style={styles.battery}>
          Battery Level: {battery.toFixed(0)}%
        </Text>
      </View>

      {/* Grid Layout */}
      <FlatList
        data={posts}
        numColumns={3}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Image
            source={item.image}
            style={styles.gridImage}
          />
        )}
      />

    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff'
  },

  profileHeader: {
    alignItems: 'center',
    padding: 15
  },

  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10
  },

  username: {
    fontSize: 18,
    fontWeight: 'bold'
  },

  battery: {
    marginTop: 5,
    fontSize: 16,
    color: 'green'
  },

  gridImage: {
    width: '33%',
    height: 120,
    margin: 1
  }

});