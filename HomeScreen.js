import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
  StatusBar,
  PermissionsAndroid,
  Alert,
  ActivityIndicator
} from 'react-native';

import { launchCamera } from 'react-native-image-picker';

export default function HomeScreen({ navigation }) {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  // ✅ FETCH POSTS FROM API (5 POSTS)
  const fetchData = async () => {
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts');
      const data = await res.json();

      const formattedPosts = [
        {
          id: '1',
          user: 'john_doe',
          profile: require('../assets/profile.png'),
          postImage: require('../assets/post1.jpg'),
          caption: data[0]?.title
        },
        {
          id: '2',
          user: 'emma_wat',
          profile: require('../assets/profile.png'),
          postImage: require('../assets/post2.jpg'),
          caption: data[1]?.title
        },
        {
          id: '3',
          user: 'alex_king',
          profile: require('../assets/profile.png'),
          postImage: require('../assets/post3.jpg'),
          caption: data[2]?.title
        },
        {
          id: '4',
          user: 'sophia_lee',
          profile: require('../assets/profile.png'),
          postImage: require('../assets/post4.jpg'),
          caption: data[3]?.title
        },
        {
          id: '5',
          user: 'michael_07',
          profile: require('../assets/profile.png'),
          postImage: require('../assets/post5.jpg'),
          caption: data[4]?.title
        }
      ];

      setPosts(formattedPosts);

    } catch (error) {
      Alert.alert("Error", "Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  // ✅ CAMERA FUNCTION
  const openCamera = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        launchCamera(
          { mediaType: 'photo', quality: 1 },
          (response) => {
            if (response.didCancel) {
              console.log("Cancelled");
            } else if (response.errorCode) {
              Alert.alert("Error", response.errorMessage);
            } else {
              Alert.alert("Success", "Image Captured 📸");
            }
          }
        );
      } else {
        Alert.alert("Permission Denied");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ LOADING SCREEN
  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
        <Text>Loading posts...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <StatusBar backgroundColor="white" barStyle="dark-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.logo}>Instagram</Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.icon}>♥</Text>
          <Text style={styles.icon}>✉</Text>
        </View>
      </View>

      {/* STORIES */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.storyContainer}
      >
        <View style={styles.storyItem}>
          <View style={styles.storyBorder}>
            <Image
              source={require('../assets/story1.jpg')}
              style={styles.storyImage}
            />
          </View>
          <Text style={styles.storyText}>your_story</Text>
        </View>

        <View style={styles.storyItem}>
          <View style={styles.storyBorder}>
            <Image
              source={require('../assets/story2.jpg')}
              style={styles.storyImage}
            />
          </View>
          <Text style={styles.storyText}>john</Text>
        </View>
      </ScrollView>

      {/* POSTS */}
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 10 }}
        renderItem={({ item }) => (
          <View style={styles.postCard}>

            <View style={styles.postHeader}>
              <Image source={item.profile} style={styles.profileImage} />
              <Text style={styles.username}>{item.user}</Text>
            </View>

            <Image source={item.postImage} style={styles.postImage} />

            <View style={styles.actions}>
              <Text style={styles.actionIcon}>♥</Text>
              <Text style={styles.actionIcon}>💬</Text>
              <Text style={styles.actionIcon}>↗</Text>
            </View>

            <Text style={styles.caption}>
              <Text style={{ fontWeight: 'bold' }}>{item.user} </Text>
              {item.caption}
            </Text>

          </View>
        )}
      />

      {/* BOTTOM NAV */}
      <View style={styles.bottomNav}>
        <Text style={styles.navIcon}>🏠</Text>
        <Text style={styles.navIcon}>🔍</Text>

        <Text style={styles.navIcon} onPress={openCamera}>
          ➕
        </Text>

        <Text style={styles.navIcon}>🎬</Text>

        <Text
          style={styles.navIcon}
          onPress={() => navigation.navigate('Profile')}
        >
          👤
        </Text>
      </View>

    </View>
  );
}

// ✅ STYLES
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#f2f2f2'
  },

  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 0.5,
    borderColor: '#ccc'
  },

  logo: {
    fontSize: 22,
    fontWeight: 'bold'
  },

  icon: {
    fontSize: 20,
    marginLeft: 15
  },

  storyContainer: {
    paddingVertical: 10,
    paddingLeft: 10
  },

  storyItem: {
    alignItems: 'center',
    marginRight: 15
  },

  storyBorder: {
    padding: 3,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: 'pink'
  },

  storyImage: {
    width: 70,
    height: 70,
    borderRadius: 35
  },

  storyText: {
    marginTop: 5,
    fontSize: 12
  },

  postCard: {
    backgroundColor: '#fff',
    marginBottom: 15,
    borderRadius: 10,
    padding: 10,
    elevation: 5
  },

  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10
  },

  profileImage: {
    width: 35,
    height: 35,
    borderRadius: 20,
    marginRight: 10
  },

  username: {
    fontWeight: 'bold'
  },

  postImage: {
    width: '100%',
    height: 300
  },

  actions: {
    flexDirection: 'row',
    padding: 10
  },

  actionIcon: {
    fontSize: 22,
    marginRight: 15
  },

  caption: {
    paddingHorizontal: 10
  },

  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 12,
    borderTopWidth: 0.5,
    borderColor: '#ccc'
  },

  navIcon: {
    fontSize: 22
  }

});