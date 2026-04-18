import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native'

const RegisterScreen = ({ navigation }) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [month, setMonth] = useState('')
  const [day, setDay] = useState('')
  const [year, setYear] = useState('')
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')

  const handleRegister = () => {
    console.log(email, password, month, day, year, name, username)
    navigation.navigate('Login')
  }

  return (

    <ScrollView contentContainerStyle={styles.container}>

      <Text style={styles.logo}>InstaLite</Text>

      <Text style={styles.subtitle}>
        Sign up to see photos and videos from your friends.
      </Text>

      {/* Email */}
      <TextInput
        placeholder="Mobile number or email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      {/* Password */}
      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      {/* Birthday */}
      <Text style={styles.label}>Birthday</Text>

      <View style={styles.birthdayRow}>

        <TextInput
          placeholder="Month"
          style={styles.birthdayInput}
          value={month}
          onChangeText={setMonth}
        />

        <TextInput
          placeholder="Day"
          style={styles.birthdayInput}
          value={day}
          onChangeText={setDay}
        />

        <TextInput
          placeholder="Year"
          style={styles.birthdayInput}
          value={year}
          onChangeText={setYear}
        />

      </View>

      {/* Name */}
      <TextInput
        placeholder="Full Name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      {/* Username */}
      <TextInput
        placeholder="Username"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />

      {/* Sign Up Button */}
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <Text style={styles.loginText}>
        Already have an account?
      </Text>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginLink}>Log in</Text>
      </TouchableOpacity>

    </ScrollView>

  )
}

export default RegisterScreen


const styles = StyleSheet.create({

  container:{
    flexGrow:1,
    justifyContent:'center',
    alignItems:'center',
    padding:25,
    backgroundColor:'#0f1720'
  },

  logo:{
    fontSize:30,
    fontWeight:'bold',
    color:'white',
    marginBottom:10
  },

  subtitle:{
    color:'#cbd5e1',
    textAlign:'center',
    marginBottom:25
  },

  label:{
    alignSelf:'flex-start',
    color:'white',
    marginBottom:5
  },

  input:{
    width:'100%',
    borderWidth:1,
    borderColor:'#334155',
    backgroundColor:'#1e293b',
    borderRadius:8,
    padding:12,
    marginBottom:15,
    color:'white'
  },

  birthdayRow:{
    flexDirection:'row',
    justifyContent:'space-between',
    width:'100%',
    marginBottom:15
  },

  birthdayInput:{
    width:'30%',
    borderWidth:1,
    borderColor:'#334155',
    backgroundColor:'#1e293b',
    borderRadius:8,
    padding:10,
    color:'white'
  },

  button:{
    width:'100%',
    backgroundColor:'#1877f2',
    padding:12,
    borderRadius:8,
    alignItems:'center',
    marginTop:10
  },

  buttonText:{
    color:'white',
    fontWeight:'bold'
  },

  loginText:{
    color:'#cbd5e1',
    marginTop:20
  },

  loginLink:{
    color:'#3b82f6',
    marginTop:5
  }

})
